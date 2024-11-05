import React from 'react';
import {
  ComponentParams,
  ImageField,
  LinkField,
  NextImage,
  Text as JssText,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PrimaryButton from '../shared-components/PrimaryButton';

export interface ThreeCardLinkItemFields {
  Image: ImageField;
  Title: TextField;
  Link: LinkField;
  Badge?: TextField;
  Description?: TextField;
}

export type ThreeCardLinkItemProps = {
  params: ComponentParams;
  fields: ThreeCardLinkItemFields;
};

export const Default = (props: ThreeCardLinkItemProps): JSX.Element => {
  return (
    <div className="w-full">
      <div className="relative">
        <NextImage
          className="max-h-[180px] h-full w-full object-cover"
          field={props.fields.Image}
        />
        <p className="absolute bottom-6 left-6 p-8 z-10 uppercase px-3 py-1 text-primary-dark-green bg-jade-light w-fit text-[1.125rem] max-xl:text-sm">
          <JssText field={props.fields.Badge} />
        </p>
      </div>
      <div className="flex flex-col gap-5 p-6">
        <JssText tag="h5" className="text-muted-darkest font-bold" field={props.fields.Title} />
        <PrimaryButton noIcon={true} noUnderline field={props.fields.Link} />
      </div>
      <div>
        <JssText field={props.fields.Description} />
      </div>
    </div>
  );
};
