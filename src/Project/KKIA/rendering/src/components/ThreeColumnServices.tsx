import React, { useCallback, useState } from 'react';
import ServiceDetailCard, { ServicePageFields } from 'src/atom/ServiceDetailCard';
import ServicesSearchAndFilter, { ServiceSearchAndFilterProps } from './ServiceSearchAndFilter';
import { ComponentRendering, ComponentParams, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import Button from 'src/shared-components/Button';
import clsx from 'clsx';
import { useI18n } from 'next-localization';

interface ThreeColumnServicesFields {
  Services: Array<{
    fields: ServicePageFields;
    url: string;
  }>;
  'Button Text': TextField;
  'Search Datasource': ServiceSearchAndFilterProps;
}

type ThreeColumnServicesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ThreeColumnServicesFields;
};

const ThreeColumnServices = (props: ThreeColumnServicesProps): JSX.Element => {
  const { t } = useI18n();

  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedCategories: [] as string[],
    selectedTerminals: [] as string[],
    selectedAreas: [] as string[],
  });

  const [currentyDisplaying, setCurrentlyDisplaying] = useState(9);

  const displayMore = () => {
    setCurrentlyDisplaying((prevCount) => prevCount + 9);
  };

  const getDetailCards = (
    services: {
      fields: ServicePageFields;
      url: string;
    }[],
    take: number
  ): JSX.Element[] => {
    const limit = Math.min(take, services.length);
    return services
      .slice(0, limit)
      .map((service, index) => (
        <ServiceDetailCard
          key={index}
          fields={service.fields}
          itemUrl={service.url}
          params={props.params}
        />
      ));
  };

  const handleFilterChange = useCallback(
    (newFilters: {
      searchTerm: string;
      selectedCategories: string[];
      selectedTerminals: string[];
      selectedAreas: string[];
    }) => {
      setFilters(newFilters);
    },
    []
  );

  const filterServices = (
    services: Array<{
      fields: ServicePageFields;
      url: string;
    }>
  ) => {
    return services.filter((service) => {
      const serviceName = String(service.fields.Name.value || '');
      const matchesSearchTerm = serviceName
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      const categoryName = String(service.fields?.Category?.fields?.Name?.value || '');
      const matchesCategory =
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(categoryName);

      const matchesTerminal =
        filters.selectedTerminals.length === 0 ||
        service.fields.Terminals.some((terminal) =>
          filters.selectedTerminals.includes(String(terminal.fields?.Name?.value))
        );

      const matchesArea =
        filters.selectedAreas.length === 0 ||
        service.fields.Terminals.some((terminal) =>
          filters.selectedAreas.includes(
            String(terminal.fields?.Area?.fields['Location Name'].value)
          )
        );

      return matchesSearchTerm && matchesCategory && matchesTerminal && matchesArea;
    });
  };

  const filteredServices = filterServices(props.fields.Services);

  return (
    <SectionPaddingWrapper>
      <div className="mb-14">
        <ServicesSearchAndFilter
          rendering={props.fields['Search Datasource'].rendering}
          fields={props.fields['Search Datasource'].fields}
          onFilterChange={handleFilterChange}
        />
      </div>
      {filteredServices.length > 0 ? (
        <div
          className={clsx(
            'w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-14 max-xl:pb-10',
            { 'pb-8': filteredServices.length > currentyDisplaying }
          )}
        >
          {getDetailCards(filteredServices, currentyDisplaying)}
        </div>
      ) : (
        <div className="text-text-primary text-body-medium-bold text-center">{t('no-results')}</div>
      )}
      {filteredServices.length > 0 && filteredServices.length > currentyDisplaying && (
        <div className="flex justify-center pb-14 max-xl:pb-10">
          <Button
            label={props.fields['Button Text']?.value?.toString()}
            variant="secondary"
            onClick={displayMore}
          />
        </div>
      )}
    </SectionPaddingWrapper>
  );
};

export default ThreeColumnServices;
