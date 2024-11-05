import React from 'react';
import {
  Text,
  Field,
  ComponentRendering,
  ImageField,
  LinkField,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface FullImageWithCTAProps {
  rendering: ComponentRendering;
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Description: Field<string>;
    CTALink: LinkField;
    CTAText: Field<string>;
  };
}

const FullImageWithCTA = (props: FullImageWithCTAProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10 w-full relative">
      <div className="relative">
        <JssImage className="h-[480px] object-cover w-full" field={props.fields.Image} />
        <div className="">
          <div className="w-full absolute bottom-0 left-0 p-8 z-10">
            <h6 className="uppercase px-3 py-1 text-primary-dark-green bg-jade-light w-fit text-[1.125rem] max-xl:text-sm mb-4 rtl:ml-auto">
              <Text field={props.fields.CTAText} />
            </h6>
            <h1 className="text-[1.25rem] font-bold text-jade-light mb-4">
              <Text className="" field={props.fields.Title} />
            </h1>
            <h6 className="font-light text-jade-light">
              <Text field={props.fields.Description} />
            </h6>
          </div>
          <div className="shop-hero__preview-overlay"></div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default FullImageWithCTA;
