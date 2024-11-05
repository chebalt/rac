import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsIncrementalResults,
  widget,
} from '@sitecore-search/react';
import { debounce } from '@sitecore-search/common';
import { useI18n } from 'next-localization';
import { useCallback, useEffect, useState, useRef } from 'react';
import SearchSvg from 'assets/icons/SearchSvg';
import CloseSvg from 'assets/icons/CloseSvg';
import Button from 'src/shared-components/Button';

import ArticleHorizontalItemCard from './components/ArticleHorizontalCard';
import Spinner from './components/Spinner';

type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};

type ArticleSearchResultsProps = {
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page'>;

export const SearchResultsWithLoadMoreComponent = ({
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
}: ArticleSearchResultsProps) => {
  const { t } = useI18n();
  const prevDefaultKeyphraseRef = useRef(defaultKeyphrase);
  const [searchState, setSearchState] = useState({
    page: defaultPage,
    keyphrase: defaultKeyphrase,
    itemsPerPage: defaultItemsPerPage,
  });

  const {
    widgetRef,
    actions: { onPageNumberChange, onItemClick, onKeyphraseChange },
    queryResult: { isLoading, isFetching, data },
    state: { keyphrase },
  } = useSearchResults<ArticleModel, InitialState>({
    state: searchState,
  });

  const articles = useSearchResultsIncrementalResults();
  const totalItems = data?.total_item ?? 0;

  useEffect(() => {
    if (prevDefaultKeyphraseRef.current !== defaultKeyphrase) {
      prevDefaultKeyphraseRef.current = defaultKeyphrase;
      setSearchState((prev) => ({
        ...prev,
        keyphrase: defaultKeyphrase,
        page: 1,
      }));

      onKeyphraseChange({
        keyphrase: defaultKeyphrase,
        page: 1,
        itemsPerPage: defaultItemsPerPage,
      });
    }
  }, [defaultKeyphrase, defaultItemsPerPage, onKeyphraseChange]);

  const keyphraseChangeFn = debounce((e) => {
    onKeyphraseChange({ keyphrase: e.target.value });
  }, 200);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || isFetching) return;

    try {
      const nextPage = searchState.page + 1;
      setSearchState((prev) => ({
        ...prev,
        page: nextPage,
      }));

      await onPageNumberChange({
        ...searchState,
        page: nextPage,
      });
    } catch (error) {
      console.error('Error loading more results:', error);
      setSearchState((prev) => ({
        ...prev,
        page: searchState.page,
      }));
    }
  }, [searchState, onPageNumberChange, isLoading, isFetching]);

  const handleClearInput = () => {
    onKeyphraseChange({ keyphrase: '' });
  };

  const renderContent = () => {
    if (isLoading && !articles?.length) {
      return (
        <div className="flex justify-center items-center py-10">
          <Spinner loading={true} />
        </div>
      );
    }

    if (!isLoading && !isFetching && totalItems === 0) {
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-headline-h2 text-text-primary">{t('kkia-search-noResults')}</h3>
          <p className="text-body-medium-light text-text-secondary">
            {t('kkia-search-tryAnotherQuery')}
          </p>
        </div>
      );
    }

    const hasMoreResults = (articles?.length || 0) < totalItems;
    const showLoadMore = !isLoading && !isFetching && hasMoreResults;

    return (
      <section className="flex flex-col w-full gap-10">
        {totalItems > 0 && (
          <p className="text-text-primary text-body-large-bold">
            {t('kkia-search-results')} ({totalItems})
          </p>
        )}

        <div className="w-full">
          {articles?.map((article, index) => (
            <ArticleHorizontalItemCard
              key={`${article.id}-${article.source_id}-${index}`}
              article={article as ArticleModel}
              index={index}
              onItemClick={onItemClick}
              displayText={true}
            />
          ))}
        </div>

        {showLoadMore && (
          <div className="flex flex-col items-center w-full">
            <button
              onClick={handleLoadMore}
              disabled={isFetching}
              className="flex items-center justify-center w-full gap-2 px-6 py-4 transition-all duration-200 md:w-fit text-body-medium-bold text-text-action-primary bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {isFetching ? t('kkia-search-loading') : t('kkia-search-viewMore')}
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div ref={widgetRef}>
      <div className="relative flex flex-col gap-10 max-w-full text-black text-opacity-75">
        {isFetching && (
          <div className="fixed top-0 bottom-0 left-0 right-0 z-30 w-full h-full opacity-50 bg-surface-primary">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40">
              <Spinner loading />
            </div>
          </div>
        )}
        <div className="relative flex items-center w-full h-[76px] border border-border-action-tertiary-default hover:border-border-action-tertiary-hover hover:shadow-hover active:border-border-action-tertiary-press active:shadow-pressed focus:outline-none focus:shadow-outline">
          <div className="absolute flex items-center left-6 rtl:right-6 rtl:left-auto">
            <div className="w-6 h-6">{<SearchSvg />}</div>
          </div>
          <input
            onChange={(e) => keyphraseChangeFn(e)}
            className="p-4 pl-14 pr-[170px] pr w-full h-full box-border rtl:pr-14 rtl:pl-[170px]"
          />
          {keyphrase && (
            <div
              className="absolute flex items-center cursor-pointer right-32"
              onClick={handleClearInput}
            >
              <div className="w-6 h-6">{<CloseSvg />}</div>
            </div>
          )}
          <Button
            variant="primary"
            label="Search"
            className="absolute right-2 !w-[104px] rtl:left-2 rtl:right-auto"
          />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

const SearchResultsWithLoadMoreWidget = widget(
  SearchResultsWithLoadMoreComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);

export default SearchResultsWithLoadMoreWidget;
