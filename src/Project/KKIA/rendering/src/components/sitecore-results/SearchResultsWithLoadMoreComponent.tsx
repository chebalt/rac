import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsIncrementalResults,
  widget,
} from '@sitecore-search/react';
import { SearchResultsLoadMore } from '@sitecore-search/ui';

import ArticleHorizontalItemCard from './components/ArticleHorizontalCardComponent';
import Filter from './components/FilterComponent';
import SearchFacets from './components/SearchFacetsComponent';
import SearchLoadMoreProgress from './components/SearchLoadMoreProgressComponent';
import SortOrder from './components/SortOrderComponent';
import Spinner from './components/SpinnerComponent';

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
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

export const SearchResultsWithLoadMoreComponentComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
}: ArticleSearchResultsProps) => {
  const {
    widgetRef,
    actions: { onPageNumberChange, onItemClick },
    state: { sortType },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });

  const articles = useSearchResultsIncrementalResults();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-gray-800">
        <Spinner loading />
      </div>
    );
  }
  return (
    <div ref={widgetRef}>
      <div className="flex relative max-w-full px-4 text-black dark:text-gray-100 text-opacity-75">
        {isFetching && (
          <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-30 bg-white dark:bg-gray-800 opacity-50">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40">
              <Spinner loading />
            </div>
          </div>
        )}
        {totalItems > 0 && (
          <>
            <section className="flex flex-col flex-none relative mt-4 mr-8 w-[25%]">
              <Filter />
              <SearchFacets facets={facets} />
            </section>
            <section className="flex flex-col flex-[4_1_0%]">
              {/* Sort Select */}
              <section className="flex justify-between text-xs">
                {totalItems > 0 && (
                  <span className="font-bold">
                    Showing {articles.length} of {totalItems} results
                  </span>
                )}
                <SortOrder options={sortChoices} selected={sortType} />
              </section>

              {/* Results */}
              <div className="w-full">
                {articles.map((a, index) => (
                  <ArticleHorizontalItemCard
                    key={`${a.id}-${a.source_id}`}
                    article={a as ArticleModel}
                    index={index}
                    onItemClick={onItemClick}
                    displayText={true}
                  />
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between text-xs">
                <div className="w-full flex items-center flex-col">
                  <span className="flex mb-4 text-sm">
                    Showing {articles.length} of {totalItems}
                  </span>
                  <SearchLoadMoreProgress current={articles.length} total={totalItems} />
                  <SearchResultsLoadMore
                    className="flex rounded h-[40px] p-2 cursor-pointer text-sm border-2 border-[#ddd] mt-2 hover:opacity-30 [&[data-disabled='true']]:opacity-30"
                    onLoadMoreClick={onPageNumberChange}
                  >
                    View more
                  </SearchResultsLoadMore>
                </div>
              </div>
            </section>
          </>
        )}
        {totalItems <= 0 && !isFetching && (
          <div className="w-full flex justify-center">
            <h3>0 Results</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchResultsWithLoadMoreComponentWidget = widget(
  SearchResultsWithLoadMoreComponentComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);

export default SearchResultsWithLoadMoreComponentWidget;
