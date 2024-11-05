import React, { useState } from 'react';
import TransportSearchAndFilter, {
  TransportSearchAndFilterProps,
} from './TransportSearchAndFilter';
import TransportDetailCard, {
  TransportPageFields,
} from 'src/components/ui/three-column-transport/TransportDetailCard';
import { ComponentRendering, TextField, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import Button from 'src/shared-components/Button';
import clsx from 'clsx';
import { useI18n } from 'next-localization';

interface ThreeColumnTransportFields {
  'Transport Services': Array<{
    fields: TransportPageFields;
    url: string;
  }>;
  'Search Datasource': TransportSearchAndFilterProps;
  'Button Text': TextField;
}

interface ThreeColumnTransportProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ThreeColumnTransportFields;
}

const ThreeColumnTransport = (props: ThreeColumnTransportProps): JSX.Element => {
  const { t } = useI18n();

  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedTerminal: 'terminal-all',
  });

  const [currentyDisplaying, setCurrentlyDisplaying] = useState(9);

  const handleFilterChange = (newFilters: { searchTerm: string; selectedTerminal: string }) => {
    if (
      newFilters.searchTerm !== filters.searchTerm ||
      newFilters.selectedTerminal !== filters.selectedTerminal
    ) {
      setFilters(newFilters);
    }
  };

  const displayMore = () => {
    setCurrentlyDisplaying((prevCount) => prevCount + 9);
  };

  const getDetailCards = (
    services: {
      fields: TransportPageFields;
      url: string;
    }[],
    take: number
  ): JSX.Element[] => {
    const limit = Math.min(take, services.length);
    return services
      .slice(0, limit)
      .map((service, index) => (
        <TransportDetailCard
          key={index}
          fields={service.fields}
          itemUrl={service.url}
          params={props.params}
        />
      ));
  };

  const filterTransportServices = (
    transports: Array<{
      fields: TransportPageFields;
      url: string;
    }>
  ) => {
    return transports.filter((transport) => {
      const transportName = String(transport.fields.Name.value || '');
      const matchesSearchTerm = transportName
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      const matchesTerminal =
        filters.selectedTerminal === 'terminal-all' ||
        transport.fields.Terminals.find(
          (terminal) => filters.selectedTerminal === terminal.fields.Name.value
        );

      return matchesSearchTerm && matchesTerminal;
    });
  };

  const filteredTransportServices = filterTransportServices(props.fields['Transport Services']);

  return (
    <SectionPaddingWrapper>
      <div>
        <TransportSearchAndFilter
          rendering={props.fields['Search Datasource'].rendering}
          fields={props.fields['Search Datasource'].fields}
          onFilterChange={handleFilterChange}
        />
      </div>
      {filteredTransportServices.length > 0 ? (
        <div
          className={clsx(
            'w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-14 max-xl:pb-10',
            { 'pb-8': filteredTransportServices.length > currentyDisplaying }
          )}
        >
          {getDetailCards(filteredTransportServices, currentyDisplaying)}
        </div>
      ) : (
        <div className="text-text-primary text-body-medium-bold text-center">{t('no-results')}</div>
      )}
      {filteredTransportServices.length > 0 &&
        filteredTransportServices.length > currentyDisplaying && (
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

export default ThreeColumnTransport;
