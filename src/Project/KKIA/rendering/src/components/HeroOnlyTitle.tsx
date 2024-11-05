import React from 'react';
import {
  Image as JssImage,
  ImageField,
  TextField,
  ComponentRendering,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface HeroOnlyTitleProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Image: ImageField;
  };
}

const HeroOnlyTitle = (props: HeroOnlyTitleProps): JSX.Element => {
  return (
    <div className="shop-page-hero w-full max-h-[320px] relative">
      <JssImage field={props.fields?.Image} className="h-[320px] object-cover w-full" />

      <SectionPaddingWrapper>
        <div className="absolute bottom-[3.5rem] flex flex-col gap-[3.5rem] z-10">
          <div className="text-[4rem] max-xl:text-[3rem] font-bold text-jade-light">
            <Text field={props.fields?.Title} />
          </div>
        </div>
      </SectionPaddingWrapper>

      <div className="shop-hero__preview-overlay"></div>
    </div>
  );
};

export default HeroOnlyTitle;
