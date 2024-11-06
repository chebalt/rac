import React from 'react';
import { ComponentParams, Field, Text as JSSText } from '@sitecore-jss/sitecore-jss-nextjs';

export interface CityFields {
  City: Field<string>;
  Latitude: Field<string>;
  Longitude: Field<string>;
}
export type CityProps = {
  params: ComponentParams;
  fields: CityFields;
};

export const Default = (props: CityProps): JSX.Element => {
  return (
    <option
      suppressHydrationWarning
      value={`${props.fields.Latitude?.value},${props.fields.Longitude?.value}`}
    >
      <JSSText field={props.fields.City} />
    </option>
  );
};
