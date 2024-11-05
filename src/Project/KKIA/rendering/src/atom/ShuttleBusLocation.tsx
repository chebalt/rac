import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';

interface ShuttleBusTypeFields {
  fields: {
    Name: TextField;
  };
}

export interface ShuttleBusLocationFields {
  Icon: ImageField;
  Title: TextField;
  Description: TextField;
  'Shuttle Bus Type': ShuttleBusTypeFields;
  Location: LinkField;
}

export type ShuttleBusLocationProps = {
  fields: ShuttleBusLocationFields;
};

const ShuttleBusLocation = (props: ShuttleBusLocationProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-6 max-w-[430px] rtl:items-end">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <JssImage field={props.fields.Icon} className="w-6 h-6" />
          <JssText
            field={props.fields.Title}
            tag="h3"
            className="text-body-large-bold text-secondary"
          />
        </div>

        <JssText
          field={props.fields.Description}
          tag="p"
          className="text-body-normal-light text-text-secondary"
        />
      </div>

      <div className="flex items-center gap-2 relative max-w-fit">
        <JssLink
          field={props.fields.Location}
          className="pr-8 relative z-10 text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
        />
        <ArrowRightSvg className="absolute right-0 z-0 text-icon-primary" />
      </div>
    </div>
  );
};

export default ShuttleBusLocation;
