import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { ComponentRendering, TextField, Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import axios from 'axios';
import { Flight } from '../pages/api/flightsInformation';
import RadioButton from './ui/inputs/RadioButton';
import FlightDatepicker from './ui/inputs/FightDatepicker';
import FlightSearchBar from './ui/inputs/FlightSearchBar';
import PlaneLandingSvg from '../assets/icons/PlaneLandingSvg';
import PlaneStarting from '../assets/icons/PlaneStarting';
import { useSearch } from '../contexts/SearchContext';
import { isSameDay } from 'date-fns';
import SearchBar from './ui/inputs/SearchBar';

export interface FlightSearchProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    'Text Placeholder': TextField;
    'Button Text': TextField;
  };
}

export const Default = (props: FlightSearchProps): JSX.Element => {
  const { t } = useI18n();
  const { searchTerm, setSearchTerm } = useSearch();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [flightType, setFlightType] = useState<string>('arrival');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const apiUrl = `${baseUrl}/api/flightsInformation`;

  const router = useRouter();

  const fetchFlights = useCallback(async () => {
    try {
      const response = await axios.get<Flight[]>(apiUrl);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const handleSearch = useCallback(() => {
    const normalizedSearchTerm = searchTerm?.replace(/\s+/g, '').toLowerCase() || '';

    const filteredFlightsByType = flights.filter(
      (flight) => flight?.departureOrArrival?.toLowerCase() === flightType?.toLowerCase()
    );

    const filteredResults = filteredFlightsByType.filter((flight) => {
      const flightSuffix = flight?.airline?.code || '';
      const flightNumber = flight?.number || '';
      const combinedFlightNumber = `${flightSuffix}${flightNumber}`
        .replace(/\s+/g, '')
        .toLowerCase();

      const airlineDescription = flight?.airline?.description || '';
      const airportName =
        flightType === 'arrival'
          ? flight?.departureAirport?.name || ''
          : flight?.arrivalAirport?.name || '';
      const airportCode =
        flightType === 'arrival'
          ? flight?.departureAirport?.code || ''
          : flight?.arrivalAirport?.code || '';
      const countryName =
        flightType === 'arrival'
          ? flight?.departureAirport?.city?.country?.name || ''
          : flight?.arrivalAirport?.city?.country?.name || '';
      const regionName =
        flightType === 'arrival'
          ? flight?.departureAirport?.city?.country?.region?.name || ''
          : flight?.arrivalAirport?.city?.country?.region?.name || '';

      const matchesSearchTerm =
        combinedFlightNumber.includes(normalizedSearchTerm) ||
        airlineDescription.toLowerCase().includes(normalizedSearchTerm) ||
        airportName.toLowerCase().includes(normalizedSearchTerm) ||
        airportCode.toLowerCase().includes(normalizedSearchTerm) ||
        countryName.toLowerCase().includes(normalizedSearchTerm) ||
        regionName.toLowerCase().includes(normalizedSearchTerm);

      const matchesDate = selectedDate
        ? isSameDay(new Date(flight.scheduled), new Date(selectedDate))
        : true;

      return matchesSearchTerm && matchesDate;
    });

    const sortedResults = filteredResults.sort(
      (a, b) => new Date(a?.scheduled).getTime() - new Date(b?.scheduled).getTime()
    );

    setSearchResults(sortedResults);
  }, [flights, searchTerm, flightType, selectedDate]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, flightType, selectedDate, handleSearch]);

  useEffect(() => {
    if (router.query.search) {
      setSearchTerm(router.query.search as string);
    }
  }, [router.query.search, setSearchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resultsRef]);

  const handleResultClick = (result: Flight) => {
    setIsResultsVisible(false);
    handleSearchClick(`${result?.airline.code || ''}${result?.number || ''}`.replace(/\s+/g, ''));
  };

  const handleSearchClick = (searchTermOverride?: string) => {
    setIsResultsVisible(false);
    const termToUse = searchTermOverride || searchTerm;

    const pathFromWindow = typeof window !== 'undefined' ? window.location.pathname : '';
    const segments = pathFromWindow.split('/').filter(Boolean);
    const cleanedSegments = Array.from(new Set(segments));

    let finalPath = `/${cleanedSegments.join('/')}`;
    if (!finalPath.endsWith('/flights/departures-and-arrivals')) {
      finalPath += '/flights/departures-and-arrivals';
    }

    const tabValue = flightType === 'arrival' ? 1 : 0;
    router.push({
      pathname: finalPath,
      query: {
        search: termToUse,
        date: selectedDate,
        tab: tabValue,
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 mt-10 md:mt-0">
          <JssText
            field={props.fields.Title}
            tag="h1"
            className="text-headline-h1 text-text-primary md:text-text-invert"
          />
          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-body-normal-regular text-text-primary md:text-text-invert"
          />
        </div>
        <FlightSearchBar
          id="flightSearchBar"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsResultsVisible(true);
          }}
          placeholder={props.fields['Text Placeholder'].value as string}
          onClick={() => handleSearchClick(searchTerm)}
          onFocus={() => setIsResultsVisible(true)}
        />
      </div>
      {isResultsVisible && searchTerm && (
        <div
          ref={resultsRef}
          className="bg-surface-primary p-4 shadow-default border border-border-primary"
        >
          <div className="flex flex-col md:flex-row justify-between rtl:flex-row-reverse">
            <div className="flex flex-row space-x-4">
              <RadioButton
                id="arrivals"
                name="flightType"
                value="arrivals"
                checked={flightType === 'arrival'}
                onChange={() => setFlightType('arrival')}
                label={t('flightsearch-arrivals')}
                labelSide="right"
              />
              <RadioButton
                id="departures"
                name="flightType"
                value="departures"
                checked={flightType === 'departure'}
                onChange={() => setFlightType('departure')}
                label={t('flightsearch-departures')}
                labelSide="right"
              />
            </div>

            <FlightDatepicker id="entryDate" value={selectedDate} onChange={setSelectedDate} />
          </div>
          {searchResults.length > 0 && (
            <div className="p-2 flex flex-col font-frutiger">
              <div className="flex flex-col space-y-4">
                {searchResults.slice(0, 3).map((result, index) => (
                  <div
                    key={index}
                    className="flex justify-between cursor-pointer rtl:flex-row-reverse"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex space-x-4">
                      <p className="text-body-small-regular text-text-secondary">
                        {new Date(result.scheduled).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-body-small-bold text-text-primary">
                        {flightType.toLowerCase() === 'arrival'
                          ? result.departureAirport.name
                          : result.arrivalAirport.name}
                      </p>
                    </div>
                    <div className="flex justify-between min-w-[85px]">
                      {flightType === 'arrival' ? (
                        <PlaneLandingSvg className="h-6 w-6 text-icon-action-secondary-default" />
                      ) : (
                        <PlaneStarting className="h-6 w-6 text-icon-action-secondary-default" />
                      )}
                      <p className="text-body-small-regular text-text-primary">
                        {result.airline.code} {result.number}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {searchResults.length > 3 && (
                <p
                  className="text-body-small-bold text-text-primary my-4"
                  onClick={() => handleSearchClick()}
                >
                  {t('flightsearch-showMoreFlightsWith')} &quot;{searchTerm}&quot;
                </p>
              )}
              <hr className="my-2" />

              <div className="my-4">
                <p className="text-label-bold text-text-primary uppercase">
                  {t('flightsearch-allFlightsTo')}
                </p>

                {Array.from(
                  new Set(
                    searchResults.map(
                      (flight) =>
                        `${flight.arrivalAirport.description} (${flight.arrivalAirport.code})`
                    )
                  )
                )
                  .slice(0, 3)
                  .map((distinctFlight, index) => (
                    <p
                      key={index}
                      className="text-body-small-bold text-text-secondary cursor-pointer"
                      onClick={() => {
                        const selectedFlight = searchResults.find(
                          (flight) =>
                            `${flight.arrivalAirport.description} (${flight.arrivalAirport.code})` ===
                            distinctFlight
                        );
                        if (selectedFlight) {
                          handleSearchClick(selectedFlight.arrivalAirport.code);
                          setSearchResults([]);
                        }
                      }}
                    >
                      {distinctFlight}
                    </p>
                  ))}
              </div>
              <hr className="my-2" />
              <div className="my-4">
                <p className="text-label-bold text-text-primary uppercase">
                  {t('flightsearch-allFlightsWith')}
                </p>

                {Array.from(
                  new Set(
                    searchResults.map(
                      (flight) => `${flight.airline.description} (${flight.airline.code})`
                    )
                  )
                )
                  .slice(0, 3)
                  .map((distinctFlight, index) => (
                    <p
                      key={index}
                      className="text-body-small-bold text-text-secondary cursor-pointer"
                      onClick={() => {
                        const selectedFlight = searchResults.find(
                          (flight) =>
                            `${flight.airline.description} (${flight.airline.code})` ===
                            distinctFlight
                        );
                        if (selectedFlight) {
                          handleSearchClick(selectedFlight.airline.description);
                          setSearchResults([]);
                        }
                      }}
                    >
                      {distinctFlight}
                    </p>
                  ))}

                <p>&nbsp;</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const NoButton = (props: FlightSearchProps): JSX.Element => {
  const { t } = useI18n();

  const { searchTerm, setSearchTerm } = useSearch();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const { flightType, setFlightType } = useSearch();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const apiUrl = `${baseUrl}/api/flightsInformation`;

  const router = useRouter();

  const fetchFlights = useCallback(async () => {
    try {
      const response = await axios.get<Flight[]>(apiUrl);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const handleSearch = useCallback(() => {
    const normalizedSearchTerm = searchTerm?.replace(/\s+/g, '').toLowerCase() || '';

    const filteredFlightsByType = flights.filter(
      (flight) => flight?.departureOrArrival?.toLowerCase() === flightType?.toLowerCase()
    );

    const filteredResults = filteredFlightsByType.filter((flight) => {
      const flightSuffix = flight?.airline?.code || '';
      const flightNumber = flight?.number || '';
      const combinedFlightNumber = `${flightSuffix}${flightNumber}`
        .replace(/\s+/g, '')
        .toLowerCase();

      const airlineDescription = flight?.airline?.description || '';
      const airportName =
        flightType === 'arrival'
          ? flight?.departureAirport?.name || ''
          : flight?.arrivalAirport?.name || '';
      const airportCode =
        flightType === 'arrival'
          ? flight?.departureAirport?.code || ''
          : flight?.arrivalAirport?.code || '';
      const countryName =
        flightType === 'arrival'
          ? flight?.departureAirport?.city?.country?.name || ''
          : flight?.arrivalAirport?.city?.country?.name || '';
      const regionName =
        flightType === 'arrival'
          ? flight?.departureAirport?.city?.country?.region?.name || ''
          : flight?.arrivalAirport?.city?.country?.region?.name || '';

      const matchesSearchTerm =
        combinedFlightNumber.includes(normalizedSearchTerm) ||
        airlineDescription.toLowerCase().includes(normalizedSearchTerm) ||
        airportName.toLowerCase().includes(normalizedSearchTerm) ||
        airportCode.toLowerCase().includes(normalizedSearchTerm) ||
        countryName.toLowerCase().includes(normalizedSearchTerm) ||
        regionName.toLowerCase().includes(normalizedSearchTerm);

      const matchesDate = selectedDate
        ? isSameDay(new Date(flight.scheduled), new Date(selectedDate))
        : true;

      return matchesSearchTerm && matchesDate;
    });

    const sortedResults = filteredResults.sort(
      (a, b) => new Date(a?.scheduled).getTime() - new Date(b?.scheduled).getTime()
    );

    setSearchResults(sortedResults);
  }, [flights, searchTerm, flightType, selectedDate]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, flightType, selectedDate, handleSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resultsRef]);

  const handleResultClick = (result: Flight) => {
    const combinedFlightNumber = `${result?.airline?.code || ''}${result?.number || ''}`.replace(
      /\s+/g,
      ''
    );
    setSearchTerm(combinedFlightNumber);
    setIsResultsVisible(false);
  };

  const handleSearchClick = (searchTermOverride?: string) => {
    setIsResultsVisible(false);
    const termToUse = searchTermOverride || searchTerm || '';
    const pathFromWindow = typeof window !== 'undefined' ? window.location.pathname : '';
    const segments = pathFromWindow.split('/').filter(Boolean);
    const cleanedSegments = Array.from(new Set(segments));

    let finalPath = `/${cleanedSegments.join('/')}`;
    if (!finalPath.endsWith('flights/departures-and-arrivals')) {
      finalPath += 'flights/departures-and-arrivals';
    }

    router.push({
      pathname: finalPath,
      query: { search: termToUse },
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <JssText
            field={props.fields.Title}
            tag="h1"
            className="text-headline-h1 text-text-primary"
          />
          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-body-normal-regular text-text-primary"
          />
        </div>
        <SearchBar
          id="flightSearchBar"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            setIsResultsVisible(true);
          }}
          placeholder={props.fields['Text Placeholder'].value as string}
          onFocus={() => setIsResultsVisible(true)}
          type="text"
        />
      </div>
      {isResultsVisible && (
        <div
          ref={resultsRef}
          className="bg-surface-primary p-4 shadow-default border border-border-primary"
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row space-x-4">
              <RadioButton
                id="arrivals"
                name="flightType"
                value="arrival"
                checked={flightType === 'arrival'}
                onChange={() => setFlightType('arrival')}
                label={t('flightsearch-arrivals')}
                labelSide="right"
              />
              <RadioButton
                id="departures"
                name="flightType"
                value="departure"
                checked={flightType === 'departure'}
                onChange={() => setFlightType('departure')}
                label={t('flightsearch-departures')}
                labelSide="right"
              />
            </div>

            <FlightDatepicker id="entryDate" value={selectedDate} onChange={setSelectedDate} />
          </div>
          {searchResults.length > 0 && (
            <div className="p-2 flex flex-col font-frutiger">
              <div className="flex flex-col space-y-4">
                {searchResults.length > 0 && (
                  <div className="p-2 flex flex-col font-frutiger">
                    <div className="flex flex-col space-y-4">
                      {searchResults.slice(0, 3).map((result, index) => (
                        <div
                          key={index}
                          className="flex justify-between cursor-pointer rtl:flex-row-reverse"
                          onClick={() => handleResultClick(result)}
                        >
                          <div className="flex space-x-4">
                            <p className="text-body-small-regular text-text-secondary">
                              {new Date(result.scheduled).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                            <p className="text-body-small-bold text-text-primary">
                              {flightType.toLowerCase() === 'arrival'
                                ? result.departureAirport.name
                                : result.arrivalAirport.name}
                            </p>
                          </div>
                          <div className="flex justify-between min-w-[85px]">
                            {flightType === 'arrival' ? (
                              <PlaneLandingSvg className="h-6 w-6 text-icon-action-secondary-default" />
                            ) : (
                              <PlaneStarting className="h-6 w-6 text-icon-action-secondary-default" />
                            )}
                            <p className="text-body-small-regular text-text-primary">
                              {result.airline.code} {result.number}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {searchResults.length > 3 && (
                <p
                  className="text-body-small-bold text-text-primary my-4 cursor-pointer"
                  onClick={() => handleSearchClick()}
                >
                  {t('flightsearch-showMoreFlightsWith')} &quot;{searchTerm}&quot;
                </p>
              )}
              <hr className="my-2" />

              <div className="my-4">
                <p className="text-label-bold text-text-primary uppercase">
                  {t('flightsearch-allFlightsTo')}
                </p>

                {Array.from(
                  new Set(
                    searchResults.map(
                      (flight) =>
                        `${flight.arrivalAirport.description} (${flight.arrivalAirport.code})`
                    )
                  )
                )
                  .slice(0, 3)
                  .map((distinctFlight, index) => (
                    <p
                      key={index}
                      className="text-body-small-bold text-text-secondary cursor-pointer"
                      onClick={() => {
                        const selectedFlight = searchResults.find(
                          (flight) =>
                            `${flight.arrivalAirport.description} (${flight.arrivalAirport.code})` ===
                            distinctFlight
                        );
                        if (selectedFlight) {
                          handleSearchClick(selectedFlight.arrivalAirport.code);
                          setSearchResults([]);
                        }
                      }}
                    >
                      {distinctFlight}
                    </p>
                  ))}
              </div>
              <hr className="my-2" />
              <div className="my-4">
                <p className="text-label-bold text-text-primary uppercase">
                  {t('flightsearch-allFlightsWith')}
                </p>

                {Array.from(
                  new Set(
                    searchResults.map(
                      (flight) => `${flight.airline.description} (${flight.airline.code})`
                    )
                  )
                )
                  .slice(0, 3)
                  .map((distinctFlight, index) => (
                    <p
                      key={index}
                      className="text-body-small-bold text-text-secondary cursor-pointer"
                      onClick={() => {
                        const selectedFlight = searchResults.find(
                          (flight) =>
                            `${flight.airline.description} (${flight.airline.code})` ===
                            distinctFlight
                        );
                        if (selectedFlight) {
                          handleSearchClick(selectedFlight.airline.description);
                          setSearchResults([]);
                        }
                      }}
                    >
                      {distinctFlight}
                    </p>
                  ))}

                <p>&nbsp;</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
