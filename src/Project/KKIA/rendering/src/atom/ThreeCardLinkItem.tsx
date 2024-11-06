import React from 'react';
import {
  ComponentParams,
  ImageField,
  LinkField,
  NextImage,
  Text as JssText,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';

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
    <div className="flex flex-col w-full">
      <div className="relative">
        <NextImage
          className="max-h-[180px] h-full w-full object-cover"
          field={props.fields.Image}
        />
        <p className="absolute bottom-6 left-6 p-8 z-10 uppercase px-3 py-1 text-primary-dark-green bg-jade-light w-fit text-[1.125rem] max-xl:text-sm">
          <JssText field={props.fields.Badge} />
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6 bg-surface-quaternary">
        <JssText
          tag="h5"
          className="text-text-secondary font-bold mb-5"
          field={props.fields.Title}
        />
        <JssText field={props.fields.Description} className="text-text-secondary font-light" />
        <div className="mt-auto">
          <Button variant="tertiary" field={props.fields.Link} rightIcon={<ArrowIconSvg />} />
        </div>
      </div>
    </div>
  );
};
