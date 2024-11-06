import React from 'react';
import {
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

export interface ColumnSliderItemFields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  'Button Link': LinkField;
  'Image Title': TextField;
}

export type ColumnSliderItemProps = {
  fields: ColumnSliderItemFields;
  slideNumber: number;
  totalSlides: number;
  id: string;
};

const ColumnSliderItem = (props: Omit<ColumnSliderItemProps, 'id'>): JSX.Element => {
  return (
    <div className="c-column-slider-item">
      <div className="relative">
        <NextImage className="c-column-slider-item__img object-center" field={props.fields.Image} />
        <div className="c-column-slider-item__index">
          <span className="c-column-slider-item__index--content rtl:rotate-180 rtl:scale-y-[-1]">
            {props.slideNumber} — {props.totalSlides}
          </span>
          <p className="text-jade-light text-[1.25rem] font-bold rtl:rotate-180 rtl:scale-y-[-1]">
            <JssText field={props.fields['Image Title']} />
          </p>
        </div>
      </div>
      <div className="mt-10 mb-6 max-xl:mt-4">
        <h3 className="c-column-slider-item--title">
          <JssText field={props.fields.Title} />
        </h3>
        <p className="c-column-slider-item--description">
          <JssText field={props.fields.Description} />
        </p>
      </div>
      <div className="c-column-slider-item__link rtl:justify-end">
        <CustomLink
          className="c-column-slider-item__link--container"
          field={props.fields['Button Link']}
        />
        <img src="/icons/hero-slider-arrow-right.svg" alt="link" />
      </div>
    </div>
  );
};

export default ColumnSliderItem;
