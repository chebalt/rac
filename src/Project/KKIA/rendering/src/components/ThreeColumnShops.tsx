import ShopDetailCard, {
  ShopPageFields,
} from 'src/components/ui/three-columns-shops/ShopDetailCard';
import ShopsSearchAndFilter, { ShopSearchAndFilterProps } from './ShopSearchAndFilter';

interface ThreeColumnShopsFields {
  Shops: Array<{
    fields: ShopPageFields;
    url: string;
  }>;
  'Button Text': TextField;
  'Search Datasource': ShopSearchAndFilterProps;
}

type ThreeColumnShopsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ThreeColumnShopsFields;
};

import {
  ComponentRendering,
  ComponentParams,
  TextField,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import { useState } from 'react';
import Button from '../shared-components/Button';
import clsx from 'clsx';
import { useI18n } from 'next-localization';

const ThreeColumnShops = (props: ThreeColumnShopsProps): JSX.Element => {
  const { t } = useI18n();

  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedCategories: [] as string[],
    selectedTerminals: [] as string[],
    selectedAreas: [] as string[],
  });

  const [visibleShopsCount, setVisibleShopsCount] = useState(9);

  const handleFilterChange = (newFilters: {
    searchTerm: string;
    selectedCategories: string[];
    selectedTerminals: string[];
    selectedAreas: string[];
  }) => {
    setFilters(newFilters);
    setVisibleShopsCount(9);
  };

  const filterShops = (
    shops: Array<{
      fields: ShopPageFields;
      url: string;
    }>
  ) => {
    return shops.filter((shop) => {
      const shopName = String(shop.fields.Name.value || '');
      const matchesSearchTerm = shopName.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const categoryName = String(shop.fields.Category.fields.Name.value || '');
      const matchesCategory =
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(categoryName);

      const matchesTerminal =
        filters.selectedTerminals.length === 0 ||
        shop.fields.Terminals.some((terminal) =>
          filters.selectedTerminals.includes(String(terminal.fields.Name.value))
        );

      const matchesArea =
        filters.selectedAreas.length === 0 ||
        shop.fields.Terminals.some((terminal) =>
          filters.selectedAreas.includes(String(terminal.fields.Area.fields['Location Name'].value))
        );

      return matchesSearchTerm && matchesCategory && matchesTerminal && matchesArea;
    });
  };

  const filteredShops = filterShops(props.fields.Shops);
  const visibleShops = filteredShops.slice(0, visibleShopsCount);
  const phKey = `kkia-pagecontent-threecolumnshops-${props.params.DynamicPlaceholderId}`;

  const handleLoadMore = () => {
    setVisibleShopsCount((prevCount) => prevCount + 9);
  };

  return (
    <SectionPaddingWrapper>
      <div className="mb-14">
        <ShopsSearchAndFilter
          fields={props.fields['Search Datasource'].fields}
          onFilterChange={handleFilterChange}
        />
      </div>
      <Placeholder name={phKey} rendering={props.rendering} />
      {visibleShops.length > 0 ? (
        <div
          className={clsx(
            'w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-14 max-xl:pb-10',
            { 'pb-8': visibleShops.length > visibleShopsCount }
          )}
        >
          {visibleShops.map((shop, index) => (
            <ShopDetailCard
              key={index}
              fields={shop.fields}
              itemUrl={shop.url}
              params={props.params}
            />
          ))}
        </div>
      ) : (
        <div className="text-text-primary text-body-medium-bold text-center">{t('no-results')}</div>
      )}
      {filteredShops.length > 0 && filteredShops.length > visibleShopsCount && (
        <div className="flex justify-center pb-14 max-xl:pb-10">
          <Button
            label={props.fields['Button Text'].value?.toString()}
            variant="primary"
            size="default"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </SectionPaddingWrapper>
  );
};

export default ThreeColumnShops;
