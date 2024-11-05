import React from 'react';
import {
  Text as JssText,
  ImageField,
  TextField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import useUrl from 'src/hooks/useUrl';
import Button from '../shared-components/Button';
import { useI18n } from 'next-localization';
import CategoryTagLayer from '../shared-components/CategoryTagLayer';

export interface TransportPageFields {
  Image: ImageField;
  Name: TextField;
  Description: TextField;
  Category?: {
    fields?: {
      Name?: {
        value: string;
      };
    };
  };
}

export type MoreResourcesSliderItemProps = {
  fields: TransportPageFields;
  itemUrl: string;
  displayCardLink?: boolean;
};

const MoreResourcesSliderItem = ({
  fields,
  itemUrl,
  displayCardLink,
}: MoreResourcesSliderItemProps): JSX.Element => {
  const fullUrl = useUrl(itemUrl);
  const { t } = useI18n();

  const categoryName = fields.Category?.fields?.Name?.value || '';

  return (
    <div className="h-[400px]">
      <div className="h-[180px] w-full relative">
        <NextImage className="w-full h-full object-cover" fill field={fields.Image} />
        <CategoryTagLayer name={categoryName} />
      </div>
      <div className="flex flex-col gap-5 p-6 bg-background-dark">
        <JssText className="font-bold text-muted-darkest" tag="h5" field={fields.Name} />
        {displayCardLink && (
          <div>
            <Button
              variant="secondary"
              url={fullUrl}
              label={t('moreresourcesslider-viewDetails')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreResourcesSliderItem;
