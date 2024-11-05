import React, { useState, useEffect } from 'react';
import DetailCard, { PageFields } from 'src/atom/DetailCard';
import { ComponentRendering, ComponentParams, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import Button from 'src/shared-components/Button';

import Filter from './AirlinesFilter';
import { useI18n } from 'next-localization';

interface AirlinesListFields {
  Airlines: Array<{
    fields: PageFields;
    id: string;
    url: string;
  }>;
  'Button Text': TextField;
  'Search Datasource': { fields: any };
}

type AirlinesListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: AirlinesListFields;
};

const AirlinesList = (props: AirlinesListProps): JSX.Element => {
  const { t } = useI18n();

  const [selectedTerminals, setSelectedTerminalsState] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountriesState] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlinesState] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [sortOrder, setSortOrderState] = useState<'asc' | 'desc'>('asc');

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

  const handleReset = () => {
    setSelectedTerminals([]);
    setSelectedCountries([]);
    setSelectedAirlines([]);
    setSelectedLetter('');
    setSortOrderState('asc');
    scrollToTop();
    window.history.replaceState({}, '', window.location.pathname);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const terminals = props.fields['Search Datasource'].fields.Terminals || [];
  const countries = props.fields['Search Datasource'].fields.Countries || [];
  const airlines = props.fields.Airlines || [];

  const terminalOptions = terminals.map((terminal: any) =>
    String(terminal.fields?.Name?.value || '')
  );
  const countryOptions = countries.map((country: any) => String(country.fields?.Name?.value || ''));
  const airlineOptions = airlines.map((airline) => String(airline.fields.Name?.value || ''));

  const availableLetters = new Set(airlineOptions.map((name) => name.charAt(0).toUpperCase()));

  const filtersConfig = [
    {
      id: 'terminal-filter',
      options: terminalOptions,
      selectedOptions: selectedTerminals,
      placeholder: 'All Terminals',
      multiple: true,
      onChange: setSelectedTerminals,
    },
    {
      id: 'country-filter',
      options: countryOptions,
      selectedOptions: selectedCountries,
      placeholder: 'All Countries',
      multiple: true,
      onChange: setSelectedCountries,
    },
    {
      id: 'airline-filter',
      options: airlineOptions,
      selectedOptions: selectedAirlines,
      placeholder: 'All Airlines',
      multiple: true,
      onChange: setSelectedAirlines,
    },
  ];

  const filterAirlines = (airlinesList: Array<{ fields: PageFields; id: string; url: string }>) => {
    return airlinesList.filter((airline) => {
      const airlineName = String(airline.fields.Name?.value || '');
      const terminalNames = airline.fields.Terminals?.map((terminal: any) =>
        String(terminal.fields.Name?.value || '')
      );
      const countryNames = airline.fields.Countries?.map((country: any) =>
        String(country.fields.Name?.value || '')
      );

      const matchesTerminal =
        selectedTerminals.length === 0 ||
        terminalNames?.some((name) => selectedTerminals.includes(name));

      const matchesCountry =
        selectedCountries.length === 0 ||
        countryNames?.some((name) => selectedCountries.includes(name));

      const matchesAirline =
        selectedAirlines.length === 0 || selectedAirlines.includes(airlineName);

      const matchesLetter =
        selectedLetter === '' || airlineName.toUpperCase().startsWith(selectedLetter);

      return matchesTerminal && matchesCountry && matchesAirline && matchesLetter;
    });
  };

  const sortedAirlines = (airlinesList: Array<{ fields: PageFields; id: string; url: string }>) => {
    return airlinesList.slice().sort((a, b) => {
      const aValue = String(a.fields.Name?.value || '');
      const bValue = String(b.fields.Name?.value || '');
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };

  const filteredAirlines = filterAirlines(airlines);
  const sortedFilteredAirlines = sortedAirlines(filteredAirlines);

  const groupAirlinesByFirstLetter = (
    airlinesList: Array<{ fields: PageFields; id: string; url: string }>
  ) => {
    return airlinesList.reduce((acc, airline) => {
      const name = String(airline.fields.Name?.value || '');
      if (name.length > 0) {
        const firstLetter = name[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(airline);
      }
      return acc;
    }, {} as Record<string, Array<{ fields: PageFields; id: string; url: string }>>);
  };

  const groupedAirlines = groupAirlinesByFirstLetter(sortedFilteredAirlines);

  return (
    <div className="airlines-list">
      <Filter
        filters={filtersConfig}
        showLetterFilter={true}
        availableLetters={availableLetters}
        selectedLetter={selectedLetter}
        onLetterChange={setSelectedLetter}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />

      {Object.keys(groupedAirlines).length > 0 ? (
        <div className="pt-6 px-10 md:px-0 flex flex-col gap-8">
          {Object.keys(groupedAirlines)
            .sort((a, b) => (sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)))
            .map((letter, index, array) => (
              <div
                key={letter}
                className={`md:flex md:gap-2 md:flex-col md:pb-10 ${
                  index !== array.length - 1 ? 'md:border-b md:border-jade-dark' : ''
                }`}
              >
                <h2 className="font-bold text-[2rem] mb-8">{letter}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {groupedAirlines[letter].map((airline, index) => (
                    <DetailCard
                      key={index}
                      fields={airline.fields}
                      itemUrl={airline.url}
                      params={props.params}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-text-primary text-body-medium-bold text-center">{t('no-results')}</div>
      )}

      {Object.keys(groupedAirlines).length > 0 && (
        <div className="flex justify-center pb-14 max-xl:pb-10">
          <Button
            label={props.fields['Button Text']?.value?.toString()}
            variant="primary"
            onClick={handleReset}
          />
        </div>
      )}
    </div>
  );
};

export default AirlinesList;
