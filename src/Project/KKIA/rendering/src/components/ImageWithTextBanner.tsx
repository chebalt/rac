import React from 'react';
import {
  Image as JssImage,
  ImageField,
  TextField,
  ComponentRendering,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface ImageWithTextBannerProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Image: ImageField;
  };
}

const ImageWithTextBanner = (props: ImageWithTextBannerProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10 max-xl:bg-jade-light">
      <div className="flex flex-row max-xl:flex-col-reverse max-xl:gap-8 gap-24 bg-jade-light p-14 max-xl:p-0">
        <div className="flex flex-col justify-center gap-4 w-full">
          <h3 className="font-bold text-[2rem] text-jade-darkest">
            <Text field={props.fields.Title} />
          </h3>
          <p className="font-normal text-lg text-muted-darker">
            <Text field={props.fields.Description} />
          </p>
        </div>
        <JssImage className="w-full max-h-[297px] object-cover" field={props.fields.Image} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ImageWithTextBanner;
