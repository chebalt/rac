import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { ArticleCard, Presence, PreviewSearch } from '@sitecore-search/ui';
import { useI18n } from 'next-localization';

import Spinner from './components/Spinner';

import SearchSvg from 'assets/icons/SearchSvg';
import CloseSvg from 'assets/icons/CloseSvg';
import Button from 'src/shared-components/Button';

type ArticleModel = {
  id: string;
  author: string;
  name?: string;
  title?: string;
  image_url: string;
  url: string;
  source_id?: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage' | 'suggestionsList'>;

interface PreviewSearchListProps {
  defaultItemsPerPage: number | 6;

  /**
   * An optional custom redirection handler that will be called when the user clicks on an article.
   * You can use your own redirection logic here, or any other side effect.
   * Examples
   * * (article: Article) => history.push(`/search?q=${article.id}`);
   * * (article: Article) => window.location.href = `/search?q=${article.id}`;
   * * (article: Article) => setRoute(`/custom/search/endpoint?q=${article.id}`);
   * @param article The article that was clicked.
   */
  itemRedirectionHandler?: (article: ArticleModel) => void;

  /**
   * An optional custom submit handler that will be called when the user submits the form by pressing the enter key.
   * You can use your own submit logic here, or any other side effect.
   * Most common use case is to redirect the user to a custom search page with the query string.
   * Examples
   * * (query: string) => history.push(`/search?q=${query}`);
   * * (query: string) => window.location.href = `/search?q=${query}`;
   * * (query: string) => setRoute(`/custom/search/endpoint?q=${query}`);
   * @param query The query string that was submitted.
   */
  submitRedirectionHandler?: (query: string) => void;
}

export const PreviewSearchListComponent = ({
  defaultItemsPerPage = 6,
  itemRedirectionHandler,
  submitRedirectionHandler,
}: PreviewSearchListProps) => {
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      suggestionsList: [{ suggestion: 'title_context_aware', max: 10 }],
      itemsPerPage: defaultItemsPerPage,
    },
  });
  const [inputValue, setInputValue] = useState('');
  const { t } = useI18n();

  const loading = isLoading || isFetching;

  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setInputValue(target.value);
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange]
  );

  const handleClearInput = () => {
    setInputValue('');
    onKeyphraseChange({ keyphrase: '' });
  };

  return (
    <PreviewSearch.Root>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { value: query } = e.currentTarget.elements[0] as HTMLInputElement;
          submitRedirectionHandler && submitRedirectionHandler(query);
        }}
        className="relative flex items-center w-full h-[76px] border border-border-action-tertiary-default hover:border-border-action-tertiary-hover hover:shadow-hover active:border-border-action-tertiary-press active:shadow-pressed focus-within:outline-none focus-within:shadow-outline"
      >
        <div className="absolute flex items-center left-6">
          <div className="w-6 h-6">
            <SearchSvg />
          </div>
        </div>
        <PreviewSearch.Input
          value={inputValue}
          onChange={keyphraseHandler}
          autoComplete="off"
          placeholder={t('kkia-search-input-placeholder') ?? 'Type to search...'}
          className="p-4 pl-14 pr-[170px] w-full h-full box-border bg-transparent focus:outline-none"
        />
        {inputValue && (
          <div
            className="absolute flex items-center cursor-pointer right-32"
            onClick={handleClearInput}
          >
            <div className="w-6 h-6">
              <CloseSvg />
            </div>
          </div>
        )}
        <Button
          variant="primary"
          label={t('kkia-search-button') ?? 'Search'}
          className="absolute right-2 !w-[104px]"
          type="submit"
        />
      </form>
      <PreviewSearch.Content
        data-loading={loading}
        ref={widgetRef}
        className="block overflow-y-auto justify-center pt-0 h-[224px] transition-opacity	w-[var(--radix-popover-trigger-width)] bg-surface-primary shadow-pressed z-50"
      >
        <Spinner loading={loading} />
        <Presence present={!loading}>
          <>
            <PreviewSearch.Results defaultQueryResult={queryResult}>
              {({ data: { content: articles = [] } = {} }) => (
                <PreviewSearch.Items className="flex-1 bg-surface-primary">
                  {articles.map((article, index) => (
                    <PreviewSearch.Item key={article.id} asChild>
                      <PreviewSearch.ItemLink
                        href={article.url}
                        onClick={(e) => {
                          onItemClick({ id: article.id, index, sourceId: article.source_id });
                          itemRedirectionHandler && itemRedirectionHandler(article);
                        }}
                      >
                        <ArticleCard.Root className="cursor-pointer flex flex-1 p-4 hover:bg-surface-action-primary-hover">
                          <section>
                            <ArticleCard.Title className="max-h-[32px] text-text-secondary text-body-normal-regular">
                              {article.name || article.title}
                            </ArticleCard.Title>
                          </section>
                        </ArticleCard.Root>
                      </PreviewSearch.ItemLink>
                    </PreviewSearch.Item>
                  ))}
                </PreviewSearch.Items>
              )}
            </PreviewSearch.Results>
          </>
        </Presence>
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};

const PreviewSearchListWidget = widget(
  PreviewSearchListComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default PreviewSearchListWidget;
