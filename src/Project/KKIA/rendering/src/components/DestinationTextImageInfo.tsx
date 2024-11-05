import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface DestinationPageFields {
  Title: TextField;
  Image: ImageField;
  'Airport Name': TextField;
  Description: TextField;
}

type DestinationTextImageInfoProps = {
  fields: Pick<DestinationPageFields, 'Image' | 'Title' | 'Airport Name' | 'Description'>;
};

export const DestinationTextImageInfo = (props: DestinationTextImageInfoProps): JSX.Element => {
  return (
    //remove mt-16 later (for testing purposes) while breadcrumbs are being fixed
    <div className="relative w-full xl:h-[376px] mt-16">
      <div className="relative top-0 left-0 right-0 h-[326px]">
        <JssImage field={props.fields.Image} className="w-full h-full object-cover  bg-no-repeat" />
        <SectionPaddingWrapper className="z-20 absolute top-0 left-0 right-0 bottom-0 bg-green-overlay py-6 md:py-14 flex flex-col justify-end">
          <div className="flex flex-col gap-6 max-w-[1000px]">
            <JssText
              field={props.fields.Title}
              tag="h2"
              className="text-4xl md:text-[4rem] text-jade-light font-bold"
            />
            <JssText
              field={props.fields.Description}
              tag="p"
              className="text-jade-light font-light text-lg"
            />
          </div>
        </SectionPaddingWrapper>
      </div>
    </div>
  );
};
