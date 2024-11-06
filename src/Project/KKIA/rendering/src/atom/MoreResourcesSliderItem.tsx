import React from 'react';
import {
  Text as JssText,
  ImageField,
  TextField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '../shared-components/Button';
import { useI18n } from 'next-localization';
import CategoryTagLayer from '../shared-components/CategoryTagLayer';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';

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
  displayCardLink: boolean | undefined;
};

const MoreResourcesSliderItem = ({
  fields,
  itemUrl,
  displayCardLink,
}: MoreResourcesSliderItemProps): JSX.Element => {
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
          <Button
            variant="tertiary"
            url={itemUrl}
            label={t('moreresourcesslider-viewDetails')}
            rightIcon={<ArrowRightSvg />}
          />
        )}
      </div>
    </div>
  );
};

export default MoreResourcesSliderItem;
