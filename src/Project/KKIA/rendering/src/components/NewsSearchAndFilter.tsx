import React, { useEffect, useState } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SearchBar from './ui/inputs/SearchBar';
import Datepicker from './ui/datepicker/Datepicker';
import DropdownSelect from './ui/inputs/DropdownSelect';
import Button from 'src/shared-components/Button';
import CalendarIconSvg from 'assets/icons/CalendarIconSvg';

interface NewsTypeFields {
  fields?: {
    Name?: {
      value?: string;
    };
  };
}

interface SortTypeFields {
  fields?: {
    Name?: {
      value?: string;
    };
    Key?: {
      value?: string;
    };
  };
}

interface FilterFields {
  NewsTypes: Array<NewsTypeFields>;
  SortTypes: Array<SortTypeFields>;
}

export interface NewsSearchAndFilterProps {
  rendering: ComponentRendering;
  fields: FilterFields;
  onFilterChange?: (filters: {
    searchTerm: string;
    selectedNewsTypes: string[];
    selectedDate: string;
    selectedSortType: string;
  }) => void;
}

const getNestedFieldValue = (field: { value?: string } | undefined): string => {
  return field?.value || '';
};

const noop = () => {
  console.log('No News or Articles to filter');
};

export const NewsSearchAndFilter = (props: NewsSearchAndFilterProps): JSX.Element => {
  const { t } = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNewsTypes, setSelectedNewsTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSortName, setSelectedSortName] = useState<string>('');
  const [selectedSortKey, setSelectedSortKey] = useState<string>('');

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const onFilterChange = props.onFilterChange || noop;
    onFilterChange({
      searchTerm,
      selectedNewsTypes,
      selectedDate,
      selectedSortType: selectedSortKey,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedDate, selectedNewsTypes, selectedSortKey]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedNewsTypes([]);
    setSelectedDate('');
    setSelectedSortName('');
    setSelectedSortKey('');
  };

  const newsTypes = props.fields.NewsTypes || [];
  const sortTypes = props.fields.SortTypes || [];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const sortOptions = sortTypes.map((sort) => ({
    name: getNestedFieldValue(sort.fields?.Name),
    key: getNestedFieldValue(sort.fields?.Key),
  }));

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 md:justify-between pt-14">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 flex-grow">
        <div className="w-full md:max-w-[380px]">
          <SearchBar
            placeholder={t('kkia-news-search-search')}
            value={searchTerm}
            onChange={handleSearchTermChange}
            id="service-search"
            type="text"
          />
        </div>
        <div className="w-full md:max-w-[252px]">
          <DropdownSelect
            options={newsTypes.map((newsType) => getNestedFieldValue(newsType.fields?.Name))}
            onSelect={(value) => setSelectedNewsTypes(Array.isArray(value) ? value : [value])}
            selectedOptions={selectedNewsTypes}
            placeholder="Category"
            id="news-type"
            showAll
          />
        </div>
        <div className="w-full md:max-w-[208px]">
          <Datepicker
            id="news-date"
            value={selectedDate || ''}
            onChange={handleDateChange}
            placeholder={t('kkia-news-search-date')}
            icon={<CalendarIconSvg />}
          />
        </div>
        <div className="w-full md:max-w-[208px]">
          <div className="filter-terminals shop-dine-explore__dropdown-menu relative w-full md:max-w-[252px] h-[56px]">
            <DropdownSelect
              options={sortOptions.map((sort) => sort.name)}
              onSelect={(value) => {
                const selectedSort = sortOptions.find((sort) => sort.name === value);
                if (selectedSort) {
                  setSelectedSortName(selectedSort.name);
                  setSelectedSortKey(selectedSort.key);
                }
              }}
              selectedOptions={selectedSortName}
              placeholder={t('kkia-news-search-sort')}
              id="news-sort"
              multiple={false}
            />
          </div>
        </div>
      </div>
      <Button
        onClick={handleReset}
        variant="secondary"
        size="default"
        label={t('kkia-news-search-resetFilters')}
      />
    </div>
  );
};

export default NewsSearchAndFilter;
