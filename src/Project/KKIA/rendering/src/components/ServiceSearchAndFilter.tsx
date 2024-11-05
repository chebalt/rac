import { useState, useEffect, useCallback } from 'react';
import { ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { clsx } from 'clsx';
import TickSvg from 'assets/icons/TickSvg';
import SearchBar from './ui/inputs/SearchBar';
import DropdownSelect from './ui/inputs/DropdownSelect';
import Button from 'src/shared-components/Button';

interface CategoryFields {
  fields?: {
    Name?: {
      value?: string;
    };
  };
}

interface TerminalFields {
  fields?: {
    Name?: {
      value?: string;
    };
  };
}

interface AreaFields {
  fields?: {
    'Location Name'?: {
      value?: string;
    };
  };
}

interface CategoriesFields {
  Categories: Array<CategoryFields>;
}

interface TerminalsFields {
  Terminals: Array<TerminalFields>;
}

interface AreasFields {
  Areas: Array<AreaFields>;
}

export interface ServiceSearchAndFilterFields
  extends CategoriesFields,
    TerminalsFields,
    AreasFields {
  'Button Text': TextField;
}

export interface ServiceSearchAndFilterProps {
  rendering: ComponentRendering;
  fields: ServiceSearchAndFilterFields;
  onFilterChange?: (filters: {
    searchTerm: string;
    selectedCategories: string[];
    selectedTerminals: string[];
    selectedAreas: string[];
  }) => void;
}

const getNestedFieldValue = (field: { value?: string } | undefined): string => {
  return field?.value || '';
};

const noop = () => {
  console.log('No Services to filter');
};

export const ServicesSearchAndFilter = (props: ServiceSearchAndFilterProps): JSX.Element => {
  const { t } = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTerminals, setSelectedTerminals] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    (props.onFilterChange || noop)({
      searchTerm,
      selectedCategories,
      selectedTerminals,
      selectedAreas,
    });
  }, [searchTerm, selectedCategories, selectedTerminals, selectedAreas, props.onFilterChange]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const updateSelectedState = (
      paramName: string,
      fieldsArray: Array<{ fields?: { [key: string]: { value?: string } } }>,
      setSelected: React.Dispatch<React.SetStateAction<string[]>>,
      fieldName: string
    ) => {
      const paramValue = params.get(paramName);
      if (paramValue) {
        const formattedValues = paramValue
          .split(',')
          .map((value) => decodeURIComponent(value).replace(/-/g, ' ').toLowerCase());
        const matchingItems = fieldsArray.filter((item) => {
          const fieldValue = item.fields?.[fieldName]?.value?.toLowerCase();
          return fieldValue && formattedValues.includes(fieldValue);
        });

        if (matchingItems.length > 0) {
          setSelected(
            matchingItems.map((item) => item.fields?.[fieldName]?.value || '').filter(Boolean)
          );
        }
      }
    };

    updateSelectedState('category', props.fields.Categories, setSelectedCategories, 'Name');
    updateSelectedState('terminal', props.fields.Terminals, setSelectedTerminals, 'Name');
    updateSelectedState('area', props.fields.Areas, setSelectedAreas, 'Location Name');

    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(decodeURIComponent(searchParam).replace(/-/g, ' '));
    }
  }, [props.fields.Categories, props.fields.Terminals, props.fields.Areas]);

  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set('search', encodeURIComponent(searchTerm.replace(/ /g, '-')));
    }

    if (selectedCategories.length > 0) {
      params.set(
        'category',
        selectedCategories.map((cat) => encodeURIComponent(cat.replace(/ /g, '-'))).join(',')
      );
    }

    if (selectedTerminals.length > 0) {
      params.set(
        'terminal',
        selectedTerminals.map((term) => encodeURIComponent(term.replace(/ /g, '-'))).join(',')
      );
    }

    if (selectedAreas.length > 0) {
      params.set(
        'area',
        selectedAreas.map((area) => encodeURIComponent(area.replace(/ /g, '-'))).join(',')
      );
    }

    const [basePath, hash] = window.location.href.split('#');
    const [pathname, existingSearch] = basePath.split('?');

    const newSearch = params.toString();
    const newUrl = `${pathname}${newSearch ? '?' + newSearch : ''}${hash ? '#' + hash : ''}`;

    window.history.replaceState({}, '', newUrl);
  }, [searchTerm, selectedCategories, selectedTerminals, selectedAreas]);

  useEffect(() => {
    updateURLParams();
  }, [searchTerm, selectedCategories, selectedTerminals, selectedAreas, updateURLParams]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedTerminals([]);
    setSelectedAreas([]);
    const currentHash = window.location.hash;
    window.history.replaceState({}, '', `${window.location.pathname}${currentHash}`);
  };

  const categories = props.fields.Categories || [];
  const terminals = props.fields.Terminals || [];
  const areas = props.fields.Areas || [];

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:justify-between md:items-center rtl:flex-row-reverse">
        <div className="flex flex-col flex-grow gap-4 md:flex-row md:gap-6 rtl:flex-row-reverse">
          <div className="w-full md:max-w-[539px]">
            <SearchBar
              placeholder={t('servicesearchandfilter-search')}
              value={searchTerm}
              onChange={handleSearchTermChange}
              id="service-search"
              type="text"
            />
          </div>
          <div className="w-full md:max-w-[252px]">
            <DropdownSelect
              options={terminals.map((terminal) => getNestedFieldValue(terminal.fields?.Name))}
              onSelect={(value) => setSelectedTerminals(Array.isArray(value) ? value : [value])}
              selectedOptions={selectedTerminals}
              placeholder={t('servicesearchandfilter-terminal')}
              id="terminal-sort"
            />
          </div>

          <div className="w-full md:max-w-[247px]">
            <DropdownSelect
              options={areas.map((area) => getNestedFieldValue(area.fields?.['Location Name']))}
              onSelect={(value) => setSelectedAreas(Array.isArray(value) ? value : [value])}
              selectedOptions={selectedAreas}
              placeholder={t('servicesearchandfilter-areaOfTerminal')}
              id="area-sort"
            />
          </div>
        </div>

        <Button
          onClick={handleReset}
          variant="secondary"
          size="default"
          label={t('servicesearchandfilter-resetFilters')}
        />
      </div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-10 filter-categories rtl:justify-end">
          {categories.map((category, idx) => {
            const fieldValue = getNestedFieldValue(category.fields?.Name);
            const isSelected = selectedCategories.includes(fieldValue);
            return (
              <div
                key={`category-${idx}`}
                className={clsx(
                  'px-2 py-1 border text-sm font-normal cursor-pointer flex flex-nowrap',
                  {
                    'border-primary-dark-green text-primary-dark-green bg-jade-light': isSelected,
                    'border-primary-dark-green text-jade-darkest': !isSelected,
                  }
                )}
                onClick={() =>
                  setSelectedCategories((prevSelected) =>
                    prevSelected.includes(fieldValue)
                      ? prevSelected.filter((item) => item !== fieldValue)
                      : [...prevSelected, fieldValue]
                  )
                }
              >
                {isSelected && <TickSvg className="w-6 h-6" />}
                {fieldValue || 'No Value'}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServicesSearchAndFilter;
