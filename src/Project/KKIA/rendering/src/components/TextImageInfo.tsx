import React from 'react';
import {
  Text,
  Image as JssImage,
  ComponentRendering,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface TextImageInfoProps {
  rendering: ComponentRendering;
  fields: {
    Tag: TextField;
    Title: TextField;
    Description: TextField;
    Image: ImageField;
  };
}

const TextImageInfo = (props: TextImageInfoProps): JSX.Element => {
  return (
    <SectionPaddingWrapper>
      <div className="py-6 md:py-14 md:flex md:justify-between md:gap-24 dir-rtl">
        <div className="flex flex-col md:justify-center w-full">
          <div className="text-base font-normal text-muted-darker mb-4">
            <Text field={props.fields.Tag} />
          </div>
          <div className="text-4xl md:text-5xl font-bold text-jade-darkest mb-4 md:mb-6">
            <Text field={props.fields.Title} />
          </div>
          <div className="text-lg font-normal text-muted-darker">
            <Text field={props.fields.Description} />
          </div>
        </div>
        <div className="pt-6 shop-hero__image w-full">
          <JssImage field={props.fields.Image} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default TextImageInfo;
