import React from 'react';
import {
  Text,
  Field,
  Image as JssImage,
  ComponentRendering,
  ImageField,
  Placeholder,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface HeroProps {
  rendering: ComponentRendering;
  fields: {
    Image: ImageField;
    Title: Field<string>;
    SubTitle: Field<string>;
    Description: Field<string>;
  };
  params: ComponentParams;
}

export const Default = (props: HeroProps): JSX.Element => {
  return (
    <div className="shop-page-hero w-full max-h-[372px] relative">
      <JssImage className="h-[320px] object-cover w-full" field={props.fields.Image} />
      <SectionPaddingWrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 className="text-[4rem] max-xl:text-3xl font-bold text-jade-light text-center mb-8">
          <Text field={props.fields.Title} />
        </h1>
        <h2 className="text-[1.125rem] text-jade-light text-center">
          <Text field={props.fields.Description} />
        </h2>
      </SectionPaddingWrapper>
      <div className="shop-hero__preview-overlay"></div>
    </div>
  );
};

export const HeroWithoutImage = (props: HeroProps): JSX.Element => {
  return (
    <div className="shop-page-hero w-full max-h-[372px] relative">
      <SectionPaddingWrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 className="text-[4rem] max-xl:text-3xl font-bold text-jade-light text-center mb-8">
          <Text field={props.fields.Title} />
        </h1>
        <h2 className="text-[1.125rem] text-jade-light text-center">
          <Text field={props.fields.Description} />
        </h2>
      </SectionPaddingWrapper>
      <div className="shop-hero__preview-overlay"></div>
    </div>
  );
};

export const HeroWithJadeBackground = (props: HeroProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="bg-jade-light p-14 max-md:px-4 max-md:py-10 flex flex-col gap-4">
        <div>
          <Text
            tag="h3"
            className="text-label-regular text-muted-darker pb-4"
            field={props.fields.Title}
          />
          <Text tag="h3" className="text-headline-h2" field={props.fields.SubTitle} />
        </div>
        <Text
          tag="h2"
          className="text-body-medium-regular text-muted-darker"
          field={props.fields.Description}
        />
      </div>
    </SectionPaddingWrapper>
  );
};

export const HeroWithoutBackground = (props: HeroProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="p-14 max-md:px-4 max-md:py-10 flex flex-col gap-4">
        <div>
          <Text
            tag="h3"
            className="text-label-regular text-muted-darker pb-4"
            field={props.fields.Title}
          />
          <Text tag="h3" className="text-headline-h2" field={props.fields.SubTitle} />
        </div>
        <Text
          tag="h2"
          className="text-body-medium-regular text-muted-darker"
          field={props.fields.Description}
        />
      </div>
    </SectionPaddingWrapper>
  );
};

export const HeroWithFlightSearch = (props: HeroProps): JSX.Element => {
  const phKey = `kkia-pagecontent-flightsearch`;

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col md:flex-row gap-24 dir-rtl">
        <div className="max-w-[532px] w-full">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
        <div className="max-w-[620px] w-full">
          <JssImage className="h-[340px] object-cover w-full" field={props.fields.Image} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

//adjust on flights
export const HeroLeftAlignedText = (props: HeroProps): JSX.Element => {
  return (
    <SectionPaddingWrapper childrenClass="relative" className="max-h-[300px] mb-14">
      <JssImage className="h-[300px] object-cover w-full" field={props.fields.Image} />
      <div className="absolute bottom-[2rem] left-[2rem] z-10">
        <h1 className="text-[2rem] mb-5 text-jade-light">
          <Text field={props.fields.Title} />
        </h1>
        <h2 className="text-body-medoum-regular text-jade-light">
          <Text field={props.fields.Description} />
        </h2>
      </div>
      <div className="shop-hero__preview-overlay-flights"></div>
    </SectionPaddingWrapper>
  );
};
