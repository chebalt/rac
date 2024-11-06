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
  Title: TextField;
  introText: TextField;
  date: TextField;
  timeToRead: TextField;
  type: TextField;
  image: ImageField;
}

interface NewsCardProps {
  fields: {
    url: string;
    fields: News;
  };
  firstNews: boolean;
}

export default function NewsCard({ fields, firstNews }: NewsCardProps) {
  return (
    <div
      className={clsx('flex w-full flex-col gap-6', {
        'border-b border-border-primary md:flex-row md:pb-6': !firstNews,
        'border-border-primary lg:border-r lg:pr-6': firstNews,
      })}
    >
      <JssImage
        field={fields.fields.image}
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
          <Tag label={fields.fields.type} variant="default" size="small" />
          <JssText
            tag="p"
            className="text-body-small-light text-text-primary"
            field={fields.fields.timeToRead}
          />
        </div>
        <JssText
          tag="h3"
          className={clsx(
            firstNews ? 'text-headline-h2' : 'text-body-large-regular',
            'text-text-primary'
          )}
          field={fields.fields.Title}
        />
        {!firstNews && (
          <JssText
            tag="p"
            className="text-body-small-light text-text-secondary"
            field={fields.fields.date}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {firstNews && (
          <>
            <JssText
              tag="p"
              className="text-body-medium-light text-text-secondary"
              field={fields.fields.introText}
            />
            <Button
              variant="tertiary"
              rightIcon={<ArrowRight />}
              className="!justify-start !pl-0"
            />
          </>
        )}
      </div>
    </div>
  );
}
