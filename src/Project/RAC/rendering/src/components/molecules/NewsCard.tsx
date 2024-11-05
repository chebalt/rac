import Button from 'components/atoms/Button';
import Tag from 'components/atoms/Tag';
import clsx from 'clsx';
import ArrowRight from '../icons/ArrowRight';
import {
  Text as JssText,
  Image as JssImage,
  ImageField,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface News {
  title: TextField;
  description: TextField;
  date: TextField;
  timeToRead: TextField;
  link: LinkField;
  type: TextField;
  image: ImageField;
}

interface NewsCardProps {
  news: News;
  firstNews: boolean;
}

export default function NewsCard({ news, firstNews }: NewsCardProps) {
  return (
    <div
      className={clsx('flex w-full flex-col gap-6', {
        'border-b border-border-primary md:flex-row md:pb-6': !firstNews,
        'border-border-primary lg:border-r lg:pr-6': firstNews,
      })}
    >
      <JssImage
        field={news.image}
        width={576}
        height={360}
        className={clsx('block h-auto w-full', {
          'max-h-[140px] md:max-w-[250px]': !firstNews,
          'md:max-h-[360px]': firstNews,
        })}
      />
      <div
        className={clsx('flex flex-col gap-4', {
          'md:gap-2': !firstNews,
        })}
      >
        <div className="flex gap-3">
          <Tag label={news.type} variant="default" size="small" />
          <JssText
            tag="p"
            className="text-body-small-light text-text-primary"
            field={news.timeToRead}
          />
        </div>
        <JssText
          tag="h3"
          className={clsx(
            firstNews ? 'text-headline-h2' : 'text-body-large-regular',
            'text-text-primary'
          )}
          field={news.title}
        />
        {!firstNews && (
          <JssText
            tag="p"
            className="text-body-small-light text-text-secondary"
            field={news.date}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {firstNews && (
          <>
            <JssText
              tag="p"
              className="text-body-medium-light text-text-secondary"
              field={news.description}
            />
            <Button
              variant="tertiary"
              field={news.link}
              rightIcon={<ArrowRight />}
              className="!justify-start !pl-0"
            />
          </>
        )}
      </div>
    </div>
  );
}
