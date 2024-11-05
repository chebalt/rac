import { usePreviewSearchActions } from '@sitecore-search/react';
import { PreviewSearch } from '@sitecore-search/ui';

type SuggestionBlockProps = {
  items: Array<{ text: string }>;
  title: string;
  blockId: string;
  filterAttribute?: string;
  disabled?: boolean;
};

const SuggestionBlock = ({
  items,
  title,
  blockId,
  filterAttribute,
  disabled,
}: SuggestionBlockProps) => {
  const { onSuggestionClick } = usePreviewSearchActions();
  return (
    <>
      {items.length > 0 && (
        <PreviewSearch.SuggestionsGroup
          className="flex flex-col flex-1"
          id={blockId}
          filterAttribute={filterAttribute}
        >
          {items.map(({ text }) => (
            <PreviewSearch.SuggestionTrigger
              className="cursor-pointer p-6 text-text-primary "
              id={text}
              key={text}
              asChild
              disabled={disabled}
            >
              <a
                onClick={() => {
                  onSuggestionClick({
                    name: blockId,
                    title,
                    value: text,
                    displayName: text,
                  });
                }}
              >
                {text}
              </a>
            </PreviewSearch.SuggestionTrigger>
          ))}
        </PreviewSearch.SuggestionsGroup>
      )}
    </>
  );
};

export default SuggestionBlock;
