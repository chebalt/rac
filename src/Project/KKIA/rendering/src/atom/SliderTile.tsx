import React from 'react';
import {
  Link as JssLink,
  LinkField,
  Image as JssImage,
  ImageField,
  TextField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';

export interface SliderTileFields {
  Title: TextField;
  Description: TextField;
  Link: LinkField;
  Icon: ImageField;
}

export type SliderTileProps = {
  fields: SliderTileFields;
};

const SliderTile = (props: SliderTileProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-5 p-6 bg-surface-quaternary h-[256px] rtl:items-end">
      <JssImage field={props.fields.Icon} className="w-6 h-6 text-icon-primary" />

      <JssText
        field={props.fields.Title}
        tag="h3"
        className="text-text-primary text-body-large-bold"
      />

      <JssText
        field={props.fields.Description}
        tag="p"
        className="text-text-secondary text-body-normal-light"
      />

      <div className="flex items-center gap-2 relative max-w-fit">
        <JssLink
          field={props.fields.Link}
          className="pr-8 relative z-10 text-body-normal-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-active"
        />
        <ArrowRightSvg className="absolute right-0 z-0 text-primary-dark-green" />
      </div>
    </div>
  );
};

export default SliderTile;
