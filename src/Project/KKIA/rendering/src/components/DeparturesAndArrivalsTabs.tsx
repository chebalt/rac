import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Flight } from '../pages/api/flightsInformation';
import axios from 'axios';
import { parseISO, format, isValid, isSameDay } from 'date-fns';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import DropdownSelect from './ui/inputs/DropdownSelect';
import Datepicker from './ui/datepicker/Datepicker';
import RefreshCircleSvg from '../assets/icons/RefreshCircleSvg';
import FlightItem from './ui/FlightItem';
import Button from 'src/shared-components/Button';
import { useSearch } from '../contexts/SearchContext';
import CalendarIconSvg from 'assets/icons/CalendarIconSvg';
import ApplicationPushInstruction, {
  ApplicationPushInstructionProps,
} from 'src/atom/ApplicationPushInstruction';

interface DeparturesAndArrivalsTabsFields {
  FirstTabTitle: TextField;
  FirstTabIcon: ImageField;
  SecondTabTitle: TextField;
  SecondTabIcon: ImageField;
  AirlineSelectionTitle: TextField;
  UpdatedText: TextField;
  CodeshareText: TextField;
  TerminalText: TextField;
  CheckInText: TextField;
  GateText: TextField;
  FlightDetailsLinkText: TextField;
  OnTimeText: TextField;
  ClosedText: TextField;
  CancelledText: TextField;
  DepartedText: TextField;
  DelayedText: TextField;
  ArrivedText: TextField;
  LandedText: TextField;
  ExpectedText: TextField;
  BaggageText: TextField;
  ButtonText: TextField;
  BottomText: TextField;
  BottomLogo: ImageField;
  PhoneNumber: LinkField;
  PhoneNumberIcon: ImageField;
  WhatsAppTextMessage: TextField;
  ContactTooltipText: TextField;
  PushNotificationIcon: ImageField;
  PushNotificationTooltipText: TextField;
  PushNotificationTitle: TextField;
  MobileTabText: TextField;
  MobileFirstStepText: TextField;
  MobileApplications: ApplicationPushInstructionProps[];
  MobileSecondStepText: TextField;
  WebsiteTabText: TextField;
  WebsiteFirstStepText: TextField;
  WebsiteApplications: ApplicationPushInstructionProps[];
  WebsiteSecondStepText: TextField;
  MissingDataText: TextField;
  MissingAirlineLogo: ImageField;
  NoResultFound: TextField;
}

interface DeparturesAndArrivalsTabsProps {
  fields?: DeparturesAndArrivalsTabsFields;
}

export const Default = (props: DeparturesAndArrivalsTabsProps): JSX.Element => {
  const { fields } = props;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showAllFlights, setShowAllFlights] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { flightType } = useSearch();

  useEffect(() => {
    if (flightType === 'arrival') {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [flightType]);

  const router = useRouter();
  const { search, date, tab } = router.query;
  const { searchTerm, setSearchTerm } = useSearch();

  const hasInitializedSearchTerm = useRef(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const apiUrl = `${baseUrl}/api/flightsInformation`;

  useEffect(() => {
    if (date) {
      setSelectedDate(date as string);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    }
    if (tab) {
      setActiveTab(Number(tab));
    }

    if (router.isReady && search && !hasInitializedSearchTerm.current) {
      setSearchTerm(search as string);
      hasInitializedSearchTerm.current = true;
    }
  }, [router.isReady, date, tab, search, setSelectedDate, setActiveTab, setSearchTerm]);

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights, refreshKey]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setShowAllFlights(false);
  };

  const handleShowAll = () => {
    setShowAllFlights(true);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const getUniqueAirlines = () => {
    return Array.from(new Set(flights.map((flight) => flight.airline.description)));
  };

  const getFilteredFlights = (
    flightsToFilter: Flight[],
    searchTerm: string,
    selectedAirlines: string[],
    selectedDate: string | null
  ) => {
    return flightsToFilter.filter((flight) => {
      const airlineDescription = flight.airline?.description?.toLowerCase() || '';
      const flightNumberCombined = `${flight.airline?.code?.toLowerCase() || ''}${
        flight.number?.toLowerCase() || ''
      }`;

      const airportName =
        flightType === 'arrival'
          ? flight.departureAirport?.name?.toLowerCase()
          : flight.arrivalAirport?.name?.toLowerCase();
      const airportCode =
        flightType === 'arrival'
          ? flight.departureAirport?.code?.toLowerCase()
          : flight.arrivalAirport?.code?.toLowerCase();

      const countryName = flight.arrivalAirport?.city?.country?.name?.toLowerCase() || '';
      const countryCode = flight.arrivalAirport?.city?.country?.code?.toLowerCase() || '';
      const regionName = flight.arrivalAirport?.city?.country?.region?.name?.toLowerCase() || '';
      const lowerSearchTerm = searchTerm.toLowerCase();

      const matchesSearchTerm =
        searchTerm.trim() !== ''
          ? airlineDescription.includes(lowerSearchTerm) ||
            flightNumberCombined.includes(lowerSearchTerm) ||
            airportName?.includes(lowerSearchTerm) ||
            airportCode?.includes(lowerSearchTerm) ||
            countryName.includes(lowerSearchTerm) ||
            countryCode.includes(lowerSearchTerm) ||
            regionName.includes(lowerSearchTerm)
          : true;

      const matchesAirline =
        selectedAirlines.length > 0 ? selectedAirlines.includes(airlineDescription) : true;

      const matchesDate = selectedDate
        ? isSameDay(parseISO(flight.scheduled), new Date(selectedDate)) ||
          (flight.estimated &&
            isValid(parseISO(flight.estimated)) &&
            isSameDay(parseISO(flight.estimated), new Date(selectedDate)))
        : true;

      return matchesSearchTerm && matchesAirline && matchesDate;
    });
  };

  const getLatestUpdateTime = () => {
    const validDates = flights
      .map((flight) => new Date(flight.updated))
      .filter((date) => isValid(date));

    if (validDates.length === 0) {
      return 'N/A';
    }

    const latestTime = Math.max(...validDates.map((date) => date.getTime()));
    return format(new Date(latestTime), 'HH:mm');
  };

  const filteredAndSortedDepartureFlights = useMemo(() => {
    // Removed setLoading(true) and setLoading(false) from here
    const filteredFlights = getFilteredFlights(
      flights
        .filter((flight) => flight.departureOrArrival.toLowerCase() === 'departure')
        .sort((a, b) => new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime()),
      searchTerm || '',
      selectedAirlines,
      selectedDate
    );
    return filteredFlights;
  }, [flights, searchTerm, selectedAirlines, selectedDate]);

  const filteredAndSortedArrivalFlights = useMemo(() => {
    // Removed setLoading(true) and setLoading(false) from here
    const filteredFlights = getFilteredFlights(
      flights
        .filter((flight) => flight.departureOrArrival.toLowerCase() === 'arrival')
        .sort((a, b) => new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime()),
      searchTerm || '',
      selectedAirlines,
      selectedDate
    );
    return filteredFlights;
  }, [flights, searchTerm, selectedAirlines, selectedDate]);

  const formatDisplayDate = (value: string | null): string => {
    const date = new Date(value || '');
    return isNaN(date.getTime()) ? '' : format(date, 'MMMM dd');
  };

  const handleAirlineSelect = (selected: string[]) => {
    setSelectedAirlines(selected);
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <SectionPaddingWrapper className="py-10 md:py-14 max-w-[1240px] mx-auto">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between w-full rtl:flex-row-reverse">
          <div className="flex dir-rtl">
            <div
              onClick={() => handleTabClick(0)}
              className={clsx(
                'flex items-center px-6 py-3 transition-colors border-b-2 cursor-pointer w-full',
                {
                  'text-text-action-secondary-default text-body-medium-bold bg-background border-border-action-secondary-default':
                    activeTab === 0,
                  'text-text-secondary text-body-medium-regular border-none bg-background':
                    activeTab !== 0,
                  'hover:text-text-action-secondary-hover hover:bg-surface-action-secondary-hover hover:border-border-action-secondary-hover':
                    activeTab !== 0,
                  'active:text-text-action-secondary-press active:bg-surface-action-secondary-press':
                    activeTab === 0,
                }
              )}
            >
              <span className="mr-2 w-6 h-6 flex-shrink-0">
                {fields?.FirstTabIcon && <JssImage field={fields.FirstTabIcon} />}
              </span>
              <span className="py-0.5 text-lg">
                {fields?.FirstTabTitle && <JssText field={fields.FirstTabTitle} />}
              </span>
            </div>
            <div
              onClick={() => handleTabClick(1)}
              className={clsx(
                'flex items-center px-6 py-3 transition-colors border-b-2 cursor-pointer w-full',
                {
                  'text-text-action-secondary-default text-body-medium-bold bg-background border-border-action-secondary-default':
                    activeTab === 1,
                  'text-text-secondary text-body-medium-regular border-none bg-background':
                    activeTab !== 1,
                  'hover:text-text-action-secondary-hover hover:bg-surface-action-secondary-hover hover:border-border-action-secondary-hover':
                    activeTab !== 1,
                  'active:text-text-action-secondary-press active:bg-surface-action-secondary-press':
                    activeTab === 1,
                }
              )}
            >
              <span className="mr-2 w-6 h-6 flex-shrink-0">
                {fields?.SecondTabIcon && <JssImage field={fields.SecondTabIcon} />}
              </span>
              <span className="py-0.5 text-lg">
                {fields?.SecondTabTitle && <JssText field={fields.SecondTabTitle} />}
              </span>
            </div>
          </div>

          <div className="flex gap-4 dir-rtl">
            <div className="w-1/2 md:min-w-[240px] md:max-w-[240px]">
              <DropdownSelect
                options={getUniqueAirlines()}
                onSelect={handleAirlineSelect}
                selectedOptions={selectedAirlines}
                placeholder="Airline"
              />
            </div>

            <div className="w-1/2 md:min-w-[170px]">
              <Datepicker
                id="date-picker"
                value={formatDisplayDate(selectedDate)}
                onChange={handleDateChange}
                icon={<CalendarIconSvg />}
              />
            </div>

            <div className="hidden items-center gap-2 md:flex flex-shrink-0">
              <p className="text-text-primary text-body-normal-light">
                {fields?.UpdatedText && <JssText field={fields.UpdatedText} />}:{' '}
                {getLatestUpdateTime()}
              </p>
              <div className="w-6 h-6 cursor-pointer" onClick={handleRefresh}>
                <RefreshCircleSvg />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <p className="text-text-primary text-body-normal-light">
              {fields?.UpdatedText && <JssText field={fields.UpdatedText} />}:{' '}
              {getLatestUpdateTime()}
            </p>
            <div className="w-6 h-6 cursor-pointer text-icon-primary" onClick={handleRefresh}>
              <RefreshCircleSvg />
            </div>
          </div>
        </div>
        {activeTab === 0 && (
          <>
            <div className="flex flex-col gap-4 w-full">
              {loading ? (
                <p>Loading...</p>
              ) : filteredAndSortedDepartureFlights.length > 0 ? (
                filteredAndSortedDepartureFlights
                  .slice(0, showAllFlights ? filteredAndSortedDepartureFlights.length : 8)
                  .map((flight) => <FlightItem key={flight.id} flight={flight} fields={fields} />)
              ) : (
                <JssText field={props.fields?.NoResultFound} />
              )}
            </div>

            {filteredAndSortedDepartureFlights.length > 8 && !showAllFlights && (
              <Button
                onClick={handleShowAll}
                variant="primary"
                label={fields?.ButtonText?.value || 'View more'}
              />
            )}
          </>
        )}

        {activeTab === 1 && (
          <>
            <div className="flex flex-col gap-4 w-full">
              {loading ? (
                <p>Loading...</p>
              ) : filteredAndSortedArrivalFlights.length > 0 ? (
                filteredAndSortedArrivalFlights
                  .slice(0, showAllFlights ? filteredAndSortedArrivalFlights.length : 8)
                  .map((flight) => <FlightItem key={flight.id} flight={flight} fields={fields} />)
              ) : (
                <JssText field={props.fields?.NoResultFound} />
              )}
            </div>

            {filteredAndSortedArrivalFlights.length > 8 && !showAllFlights && (
              <Button
                onClick={handleShowAll}
                variant="primary"
                label={fields?.ButtonText?.value || 'View more'}
              />
            )}
          </>
        )}

        <div className="flex items-center gap-3">
          <p className="text-body-medium-light text-text-secondary">
            {fields?.BottomText && <JssText field={fields.BottomText} />}
          </p>
          <div className="h-[48px] w-[141px]">
            {fields?.BottomLogo && <JssImage field={fields.BottomLogo} />}
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};
