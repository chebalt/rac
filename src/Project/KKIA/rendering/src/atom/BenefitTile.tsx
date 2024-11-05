import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface BenefitTileFields {
  Icon: ImageField;
  Title: TextField;
  Description: TextField;
}

export type BenefitTileProps = {
  fields: BenefitTileFields;
};

const BenefitTile = (props: BenefitTileProps): JSX.Element => {
  const hasDescription = props.fields.Description.value !== '';

  return (
    <div className="group w-full md:w-[343px] h-[256px] bg-jade-light flex flex-col justify-between p-6 relative overflow-hidden rtl:items-end">
      <div className="w-12 h-12 rounded-full bg-background flex justify-center items-center">
        <JssImage field={props.fields.Icon} />
      </div>

      <div
        className={`font-bold text-xl text-jade-darkest transition-all duration-300 ${
          hasDescription ? 'group-hover:mb-[128px]' : ''
        }`}
      >
        <JssText field={props.fields.Title} />
      </div>

      {hasDescription && (
        <div className="font-normal max-w-[calc(100%-3rem)] text-base text-muted-darker absolute bottom-0 opacity-0 group-hover:opacity-100 group-hover:bottom-6 transition-all duration-300 line-clamp-5 rtl:text-right">
          <JssText field={props.fields.Description} />
        </div>
      )}
    </div>
  );
};

export default BenefitTile;
