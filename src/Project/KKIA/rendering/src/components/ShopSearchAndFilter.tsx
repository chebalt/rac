import { useState, useEffect } from 'react';
import { useI18n } from 'next-localization';
import SearchBar from './ui/inputs/SearchBar';
import DropdownSelect from './ui/inputs/DropdownSelect';
import Button from 'src/shared-components/Button';

export interface ShopSearchAndFilterProps {
  fields: {
    Categories: Array<{ fields?: { Name?: { value?: string } } }>;
    Terminals: Array<{ fields?: { Name?: { value?: string } } }>;
    Areas: Array<{ fields?: { 'Location Name'?: { value?: string } } }>;
    'Button Text': { value: string };
  };
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

export const ShopsSearchAndFilter = (props: ShopSearchAndFilterProps): JSX.Element => {
  const { t } = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTerminals, setSelectedTerminals] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    props.onFilterChange?.({
      searchTerm,
      selectedCategories,
      selectedTerminals,
      selectedAreas,
    });
  }, [searchTerm, selectedCategories, selectedTerminals, selectedAreas]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedTerminals([]);
    setSelectedAreas([]);
  };

  const categories = props.fields.Categories || [];
  const terminals = props.fields.Terminals || [];
  const areas = props.fields.Areas || [];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:justify-between md:items-center rtl:flex-row-reverse">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-grow rtl:flex-row-reverse">
        <div className="w-full md:max-w-[380px]">
          <SearchBar
            placeholder={t('shopsearchandfilter-search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="shop-search"
            type="text"
          />
        </div>
        <div className="w-full md:max-w-[247px]">
          <DropdownSelect
            options={categories.map((category) => getNestedFieldValue(category.fields?.Name))}
            onSelect={(value) => setSelectedCategories(Array.isArray(value) ? value : [value])}
            selectedOptions={selectedCategories}
            placeholder={t('shopsearchandfilter-category')}
            id="category-sort"
          />
        </div>
        <div className="w-full md:max-w-[150px]">
          <DropdownSelect
            options={terminals.map((terminal) => getNestedFieldValue(terminal.fields?.Name))}
            onSelect={(value) => setSelectedTerminals(Array.isArray(value) ? value : [value])}
            selectedOptions={selectedTerminals}
            placeholder={t('shopsearchandfilter-terminal')}
            id="terminal-sort"
          />
        </div>
        <div className="w-full md:max-w-[247px]">
          <DropdownSelect
            options={areas.map((area) => getNestedFieldValue(area.fields?.['Location Name']))}
            onSelect={(value) => setSelectedAreas(Array.isArray(value) ? value : [value])}
            selectedOptions={selectedAreas}
            placeholder={t('shopsearchandfilter-areaOfTerminal')}
            id="area-sort"
          />
        </div>
      </div>
      <Button
        onClick={handleReset}
        variant="secondary"
        size="default"
        label={t('shopsearchandfilter-resetFilters')}
      />
    </div>
  );
};

export default ShopsSearchAndFilter;
