import React from 'react';
import {
  Text as JssText,
  Link as JssLink,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import ClockSvg from 'assets/icons/ClockSvg';
import CallSvg from 'assets/icons/CallSvg';

export interface LostAndFoundOfficeFields {
  Title: TextField;
  Description: TextField;
  'Open Time': TextField;
  Phone: TextField;
  Link: LinkField;
  Header: TextField;
}

export type LostAndFoundOfficeProps = {
  fields: LostAndFoundOfficeFields;
};

const LostAndFoundOffice = (props: LostAndFoundOfficeProps): JSX.Element => {
  return (
    <div className="bg-background-dark p-6 flex flex-col gap-5 flex-grow rtl:items-end">
      <div className="flex flex-col gap-2">
        <JssText
          field={props.fields.Header}
          tag="p"
          className="text-muted-dark text-xs font-bold"
        />

        <JssText
          field={props.fields.Title}
          tag="h3"
          className="text-muted-darkest text-xl leading-6 font-bold"
        />
      </div>
      <JssText
        field={props.fields.Description}
        tag="p"
        className="text-muted-dark text-base font-light"
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <ClockSvg className="text-jade-darker" />
          <JssText
            field={props.fields['Open Time']}
            tag="p"
            className="text-muted-dark text-base font-light"
          />
        </div>

        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <CallSvg className="text-jade-darker" />
          <JssText
            field={props.fields.Phone}
            tag="p"
            className="text-muted-dark text-base font-light"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 relative max-w-fit">
        <JssLink
          field={props.fields.Link}
          className="pr-8 relative z-10 text-primary-dark-green-variant text-base font-bold"
        />
        <ArrowRightSvg className="absolute right-0 z-0 text-primary-dark-green" />
      </div>
    </div>
  );
};

export default LostAndFoundOffice;
