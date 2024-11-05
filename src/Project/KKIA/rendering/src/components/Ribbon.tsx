import React from 'react';
import { Image as JssImage, Field, RichText, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

interface RibbonProps {
  params: { [key: string]: string };
  fields: {
    Icon: ImageField;
    Text: Field<string>;
  };
}

const RibbonDefaultComponent = (): JSX.Element => (
  <div className={`component`}>
    <div className="component-content">
      <span className="is-empty-hint">Ribbon Component</span>
    </div>
  </div>
);

export const Default = (props: RibbonProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="w-full h-[72px] bg-error-dark flex items-center justify-center text-white">
        <div className="flex gap-3">
          <JssImage field={props.fields.Icon} />
          <RichText field={props.fields.Text} />
        </div>
      </div>
    );
  }
  return <RibbonDefaultComponent />;
};
