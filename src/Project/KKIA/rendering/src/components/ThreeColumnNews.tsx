import React, { useState } from 'react';
import { ComponentRendering, ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';
import { NewsCardsItemFields } from './NewsCards';
import NewsSearchAndFilter, { NewsSearchAndFilterProps } from './NewsSearchAndFilter';
import NewsCardsItem from './ui/news-cards/NewsCardsItem';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import clsx from 'clsx';
import Button from 'src/shared-components/Button';
import { useI18n } from 'next-localization';

interface ThreeColumnNewsFields {
  News: Array<{
    fields: NewsCardsItemFields;
    url: string;
  }>;
  DataSource: NewsSearchAndFilterProps;
}

type ThreeColumnNewsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ThreeColumnNewsFields;
};

const getNestedFieldValue = (field: { value?: string } | undefined): string => {
  return field?.value || '';
};

const ThreeColumnNews = (props: ThreeColumnNewsProps): JSX.Element => {
  const { t } = useI18n();

  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedNewsTypes: [] as string[],
    selectedDate: '',
    selectedSortType: '',
  });

  const [visibleNewsCount, setVisibleNewsCount] = useState(9);

  const getDetailCards = (
    news: {
      fields: NewsCardsItemFields;
      url: string;
    }[],
    take: number
  ) => {
    const content: JSX.Element[] = [];
    const limit = Math.min(take, news.length);
    return news
      .slice(0, limit)
      .map((pieceOfNews, index) => (
        <NewsCardsItem
          key={index}
          fields={pieceOfNews.fields}
          itemUrl={pieceOfNews.url}
          params={props.params}
        />
      ));
  };

  const handleFilterChange = (newFilters: {
    searchTerm: string;
    selectedNewsTypes: string[];
    selectedDate: string;
    selectedSortType: string;
  }) => {
    setFilters(newFilters);
    setVisibleNewsCount(9);
  };

  const filterNews = (
    news: Array<{
      fields: NewsCardsItemFields;
      url: string;
    }>
  ) => {
    const newsWithFilters = news.filter((pieceOfNews) => {
      const newsName = String(pieceOfNews.fields?.Description?.value || '');
      const matchesSearchTerm = newsName.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const newsTypeName = getNestedFieldValue(pieceOfNews.fields.NewsType?.fields?.Name);
      const matchesNewsTypes =
        filters.selectedNewsTypes.length === 0 ||
        filters.selectedNewsTypes.includes('All') ||
        filters.selectedNewsTypes.includes(newsTypeName);

      // Publication date is in format 2024-02-01T10:34:00Z
      const publicationDate = pieceOfNews.fields['Publication Date'].value || '';

      // Filter date is in format 2024-10-02
      const filterDate = filters.selectedDate;

      const matchesDate = filterDate === '' || publicationDate.substring(0, 10) === filterDate;

      return matchesSearchTerm && matchesNewsTypes && matchesDate;
    });

    if (filters.selectedSortType == 'dateAsc') {
      newsWithFilters.sort((a, b) => {
        const dateA = new Date(a.fields['Publication Date'].value || '').getTime();
        const dateB = new Date(b.fields['Publication Date'].value || '').getTime();
        return dateA - dateB;
      });
    } else if (filters.selectedSortType == 'dateDesc') {
      newsWithFilters.sort((a, b) => {
        const dateA = new Date(a.fields['Publication Date'].value || '').getTime();
        const dateB = new Date(b.fields['Publication Date'].value || '').getTime();
        return dateB - dateA;
      });
    }

    return newsWithFilters;
  };

  const filteredNews = filterNews(props.fields.News);

  const handleLoadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 9);
  };

  return (
    <SectionPaddingWrapper>
      <div className="mb-14">
        <NewsSearchAndFilter
          rendering={props.fields.DataSource.rendering}
          fields={props.fields.DataSource.fields}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="w-full pb-14 max-xl:pb-10">
        {filteredNews.length > 0 ? (
          <div
            className={clsx('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6', {
              'pb-8': filteredNews.length > visibleNewsCount,
            })}
          >
            {getDetailCards(filteredNews, visibleNewsCount)}
          </div>
        ) : (
          <div className="text-text-primary text-body-medium-bold text-center">
            {t('no-results')}
          </div>
        )}
      </div>
      {filteredNews.length > 0 && filteredNews.length > visibleNewsCount && (
        <div className="flex justify-center pb-14 max-xl:pb-10">
          <Button variant="primary" label="Show more" onClick={handleLoadMore} />
        </div>
      )}
    </SectionPaddingWrapper>
  );
};

export default ThreeColumnNews;
