import React, { useState } from 'react';
import {
  ComponentRendering,
  ComponentParams,
  TextField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import Filter from './AirlinesFilter';
import Button from '../shared-components/Button';

interface CountryProps {
  fields: {
    Name: TextField;
  };
}

interface AirlinePageProps {
  fields: {
    Name: TextField;
    Terminals?: Array<{
      fields: {
        Name: TextField;
      };
    }>;
  };
}

interface DestinationPageFields {
  'Airport Name': TextField;
  'City name': TextField;
  Country: CountryProps;
  Airlines: AirlinePageProps[] | null;
}

interface DestinationsListFields {
  Destinations: Array<{
    fields: DestinationPageFields;
    id: string;
    url: string;
  }>;
  'Button Text': TextField;
  'Button Text Show Less': TextField;
}

type DestinationsListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: DestinationsListFields;
};

const DestinationsList = (props: DestinationsListProps): JSX.Element => {
  const [selectedTerminals, setSelectedTerminalsState] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountriesState] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlinesState] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [sortOrder, setSortOrderState] = useState<'asc' | 'desc'>('asc');

  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);

  const handleLetterChange = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter('');
    } else {
      setSelectedLetter(letter);
    }
  };

  const setSelectedTerminals = (selected: string[] | string) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    setSelectedTerminalsState(selectedArray);
  };

  const setSelectedCountries = (selected: string[] | string) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    setSelectedCountriesState(selectedArray);
  };

  const setSelectedAirlines = (selected: string[] | string) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    setSelectedAirlinesState(selectedArray);
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrderState(order);
  };

  const countries = Array.from(
    new Set(
      props.fields.Destinations.map((destination) =>
        String(destination.fields?.Country?.fields?.Name?.value || '')
      )
    )
  ).filter(Boolean);

  const cities = Array.from(
    new Set(
      props.fields.Destinations.map((destination) =>
        String(destination.fields['City name']?.value || '')
      )
    )
  ).filter(Boolean);

  const airlines = Array.from(
    new Set(
      props.fields.Destinations.flatMap((destination) =>
        (destination.fields.Airlines || []).map((airline) =>
          String(airline.fields.Name?.value || '')
        )
      )
    )
  ).filter(Boolean);

  const terminals = Array.from(
    new Set(
      props.fields.Destinations.flatMap((destination) =>
        (destination.fields.Airlines || []).flatMap((airline) =>
          (airline.fields.Terminals || []).map((terminal) =>
            String(terminal.fields?.Name?.value || '')
          )
        )
      )
    )
  ).filter(Boolean);

  const availableLetters = new Set(cities.map((city) => city.charAt(0).toUpperCase()));

  const filtersConfig = [
    {
      id: 'terminal-filter',
      options: terminals,
      selectedOptions: selectedTerminals,
      placeholder: 'All Terminals',
      multiple: true,
      onChange: setSelectedTerminals,
    },
    {
      id: 'country-filter',
      options: countries,
      selectedOptions: selectedCountries,
      placeholder: 'All Countries',
      multiple: true,
      onChange: setSelectedCountries,
    },
    {
      id: 'airline-filter',
      options: airlines,
      selectedOptions: selectedAirlines,
      placeholder: 'All Airlines',
      multiple: true,
      onChange: setSelectedAirlines,
    },
  ];

  const filterDestinations = (
    destinations: DestinationsListFields['Destinations']
  ): DestinationsListFields['Destinations'] => {
    return destinations.filter((destination) => {
      const countryName = String(destination.fields?.Country?.fields?.Name?.value || '');

      const airlineNames = (destination.fields.Airlines || []).map((airline) =>
        String(airline.fields.Name?.value || '')
      );

      const airlineTerminals = (destination.fields.Airlines || []).flatMap((airline) =>
        (airline.fields.Terminals || []).map((terminal) =>
          String(terminal.fields?.Name?.value || '')
        )
      );

      const matchesTerminal =
        selectedTerminals.length === 0 ||
        airlineTerminals.some((name) => selectedTerminals.includes(name));

      const matchesCountry =
        selectedCountries.length === 0 || selectedCountries.includes(countryName);

      const matchesAirline =
        selectedAirlines.length === 0 ||
        airlineNames.some((name) => selectedAirlines.includes(name));

      const matchesLetter =
        selectedLetter === '' || countryName.toUpperCase().startsWith(selectedLetter);

      return matchesTerminal && matchesCountry && matchesAirline && matchesLetter;
    });
  };

  const filteredDestinations = filterDestinations(props.fields.Destinations);

  const groupDestinationsByCountry = (destinations: DestinationsListFields['Destinations']) => {
    return destinations.reduce((acc, destination) => {
      const countryName = String(destination.fields?.Country?.fields?.Name?.value || '');
      const cityName = String(destination.fields['City name']?.value || '');

      if (countryName && cityName) {
        if (!acc[countryName]) {
          acc[countryName] = [];
        }
        acc[countryName].push(destination);
      }
      return acc;
    }, {} as Record<string, DestinationsListFields['Destinations']>);
  };

  const groupedDestinations = groupDestinationsByCountry(filteredDestinations);

  const numberOfCountries = Object.keys(groupedDestinations).length;

  const sortedCountries = Object.keys(groupedDestinations).sort((a, b) =>
    sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  );

  const countriesToDisplay = showAllCountries ? sortedCountries : sortedCountries.slice(0, 7);

  return (
    <SectionPaddingWrapper className="destinations-list">
      <Filter
        filters={filtersConfig}
        showLetterFilter={true}
        availableLetters={availableLetters}
        selectedLetter={selectedLetter}
        onLetterChange={handleLetterChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />

      <div className="pt-6">
        {countriesToDisplay.map((country) => (
          <div className="mb-10 flex flex-col gap-2" key={country}>
            <h2 className="text-body-large-bold text-primary-dark-green">{country}</h2>
            {groupedDestinations[country]
              .sort((a, b) => {
                const cityA = String(a.fields['City name']?.value || '');
                const cityB = String(b.fields['City name']?.value || '');
                return sortOrder === 'asc'
                  ? cityA.localeCompare(cityB)
                  : cityB.localeCompare(cityA);
              })
              .map((destination, index) => {
                return (
                  <a href={destination.url} className="flex items-baseline gap-2" key={index}>
                    <JssText
                      tag="p"
                      className="text-body-large-regular text-jade-darkest font-light"
                      field={destination.fields['City name']}
                    />
                    <JssText
                      tag="p"
                      className="text-body-large-bold text-jade-darkest"
                      field={destination.fields['Airport Name']}
                    />
                  </a>
                );
              })}
          </div>
        ))}
      </div>

      {numberOfCountries > 6 && (
        <div className="flex justify-center w-full pt-10">
          <Button
            variant="primary"
            label={
              showAllCountries
                ? props.fields['Button Text Show Less'].value?.toString()
                : props.fields['Button Text'].value?.toString()
            }
            onClick={() => setShowAllCountries(!showAllCountries)}
          />
        </div>
      )}
    </SectionPaddingWrapper>
  );
};

export default DestinationsList;
