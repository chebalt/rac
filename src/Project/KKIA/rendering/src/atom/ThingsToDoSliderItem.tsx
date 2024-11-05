import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ThingsToDoSliderItemFields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  Link: LinkField;
}

export type ThingsToDoSliderItemProps = {
  fields: ThingsToDoSliderItemFields;
};

const ThingsToDoSliderItem = (props: ThingsToDoSliderItemProps): JSX.Element => {
  return (
    <div className="things-to-do-slider-item flex flex-col w-full bg-white md:min-h-[488px] mb-8">
      <div className="h-[200px] relative">
        <JssImage field={props.fields.Image} className="absolute w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col p-6 max-xl:gap-5 rtl:items-end">
        <div className="flex-1">
          <h3 className="text-[1.25rem] text-jade-darkest font-bold mb-[1.25rem]">
            <JssText field={props.fields.Title} />
          </h3>
          <p className="font-light">
            <JssText tag="h6" field={props.fields.Description} />
          </p>
        </div>
        <div className="c-column-slider-item__link">
          <JssLink className="c-column-slider-item__link--container" field={props.fields.Link} />
          <img src="/icons/hero-slider-arrow-right.svg" alt="link" />
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoSliderItem;
