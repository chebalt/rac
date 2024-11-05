import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ThreeColumnFeatureFields {
  Icon: ImageField;
  Text: TextField;
}

export type ThreeColumnFeatureProps = {
  fields: ThreeColumnFeatureFields;
};

const ThreeColumnFeature = (props: ThreeColumnFeatureProps): JSX.Element => {
  return (
    <div className="flex items-center gap-6 bg-jade-light p-6">
      <div className="min-w-12 h-12 bg-background rounded-full flex items-center justify-center">
        <JssImage field={props.fields.Icon} className="text-primary-dark-green" />
      </div>

      <JssText
        field={props.fields.Text}
        tag="h3"
        className="text-xl font-bold text-muted-darkest w-full"
      />
    </div>
  );
};

export default ThreeColumnFeature;
