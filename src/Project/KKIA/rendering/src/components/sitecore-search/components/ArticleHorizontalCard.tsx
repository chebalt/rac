import type { ActionProp, ItemClickedAction } from '@sitecore-search/react';
import { ArticleCard } from '@sitecore-search/ui';

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

type ArticleCardItemCardProps = {
  className?: string;
  displayText?: boolean;
  article: ArticleModel;
  onItemClick: ActionProp<ItemClickedAction>;
  index: number;
};

const ArticleHorizontalItemCard = ({
  className = '',
  article,
  onItemClick,
  index,
  displayText = false,
}: ArticleCardItemCardProps) => {
  return (
    <ArticleCard.Root
      key={article.id}
      className={`group flex flex-row pb-6 mb-6 flex-nowrap max-h-52 w-full border-b border-border-secondary-2 ${className}`}
    >
      <div className="flex-col grow">
        <a
          href={article.url}
          onClick={(event) => {
            event.preventDefault();
            onItemClick({
              id: article.id,
              index,
              sourceId: article.source_id,
            });
          }}
        >
          <ArticleCard.Title className="text-text-primary text-body-medium-bold">
            {article.name || article.title}
          </ArticleCard.Title>
        </a>

        {article.description && displayText && (
          <div className="mt-3 text-sm line-clamp-3">{article.description}</div>
        )}
      </div>
    </ArticleCard.Root>
  );
};
export default ArticleHorizontalItemCard;
