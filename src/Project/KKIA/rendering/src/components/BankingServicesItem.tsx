import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface BankingServicesItemFields {
  Title: TextField;
  Description: TextField;
  Icon: ImageField;
}

interface BankingServicesItemProps {
  fields: BankingServicesItemFields;
}

export const Default = (props: BankingServicesItemProps): JSX.Element => {
  return (
    <div className="flex flex-col items-start gap-6 rtl:items-end">
      <JssImage className="w-14 h-14 object-contain" field={props.fields.Icon} />
      <div className="flex flex-col gap-2">
        <JssText
          field={props.fields.Title}
          tag="h3"
          className="text-text-primary text-body-large-bold"
        />
        <JssText
          field={props.fields.Description}
          tag="p"
          className="text-text-secondary text-body-normal-regular"
        />
      </div>
    </div>
  );
};

export const SmallIcons = (props: BankingServicesItemProps): JSX.Element => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex items-center gap-2 w-full">
        <JssImage className="w-[20px] h-[20px] object-contain" field={props.fields.Icon} />
        <JssText
          field={props.fields.Title}
          tag="h5"
          className="body-large-bold text-text-primary "
        />
      </div>
      <JssText
        field={props.fields.Description}
        tag="h6"
        className="text-text-secondary text-body-normal-regular w-full"
      />
    </div>
  );
};
