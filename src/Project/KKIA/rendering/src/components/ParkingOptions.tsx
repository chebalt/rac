import React from 'react';
import {
  Text,
  ComponentParams,
  TextField,
  ImageField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import Option from './ui/parking-options/Option';

export interface ParkingPageFields {
  Image: ImageField;
  Name: TextField;
  Location: LinkField;
  Information: Array<InformationFields>;
  'Route Guides': Array<RouteGuideFields>;
  'Direction Icon': ImageField;
  'Link Icon': ImageField;
}
export interface InformationFields {
  id: string;
  fields: {
    Text: TextField;
    Icon: ImageField;
  };
}

export interface RouteGuideFields {
  id: string;
  fields: {
    Text: TextField;
  };
}

interface ParkingOptionsFields {
  'Parking Options': Array<{
    fields: ParkingPageFields;
    id: string;
    url: string;
  }>;
  Title: TextField;
  Description: TextField;
}

interface ParkingOptionsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ParkingOptionsFields;
}

const ParkingOptions = (props: ParkingOptionsProps): JSX.Element => {
  const title = props.fields.Title;
  const description = props.fields.Description;
  const parkingOptions = props.fields['Parking Options'];

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="mb-10">
        <h2 className="text-headline-h2 text-text-primary mb-4">
          <Text field={title} />
        </h2>
        <p className="text-body-medium-light text-text-secondary">
          <Text field={description} />
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {parkingOptions.map(({ fields, url, id }) => (
          <Option key={id} fields={fields} itemUrl={url} />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export default ParkingOptions;
