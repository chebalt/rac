import React from 'react';
import { ComponentRendering, Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import ThreeColumnFeature, { ThreeColumnFeatureProps } from 'src/atom/ThreeColumnFeature';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import ThreeColumnFeatureVariant from '../atom/ThreeColumnFeatureVariant';

interface ThreeColumnFeaturesProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Features: ThreeColumnFeatureProps[];
  };
}

export const Default = (props: ThreeColumnFeaturesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-4 mb-10">
        <JssText
          field={props.fields.Title}
          tag="h2"
          className="text-2xl md:text-[2rem] font-bold text-jade-darkest"
        />

        <JssText
          field={props.fields.Description}
          tag="p"
          className="text-lg font-light text-muted-darker"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {props.fields.Features?.map((feature, index) => (
          <ThreeColumnFeature key={index} fields={feature.fields} />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export const WithRegularText = (props: ThreeColumnFeaturesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-4 mb-10">
        <JssText
          field={props.fields.Description}
          tag="p"
          className="text-lg font-light text-muted-darker"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {props.fields.Features?.map((feature, index) => (
          <ThreeColumnFeature key={index} fields={feature.fields} />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export const TwoElementsOnBottom = (props: ThreeColumnFeaturesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-4 mb-10">
        <JssText
          field={props.fields.Description}
          tag="p"
          className="text-lg font-light text-muted-darker"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {props.fields.Features?.map((feature, index) => (
          <div key={index} className={`${index < 3 ? 'md:col-span-4' : 'md:col-span-6'}`}>
            <ThreeColumnFeatureVariant fields={feature.fields} />
          </div>
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};
