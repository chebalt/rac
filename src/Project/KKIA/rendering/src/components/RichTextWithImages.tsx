import React from 'react';
import {
  Field,
  RichText,
  ComponentRendering,
  ImageField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface RichTextWithImagesProps {
  rendering: ComponentRendering;
  fields: {
    Text: Field<string>;
    FirstImage: ImageField;
    SecondImage: ImageField;
    ThirdImage: ImageField;
  };
}

const RichTextWithImages = (props: RichTextWithImagesProps): JSX.Element => {
  const isObjectEmpty = (obj: any) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  return (
    <SectionPaddingWrapper>
      <div className="flex flex-col w-full">
        <RichText tag="h6" className="text-muted-darkest" field={props.fields.Text} />
        <div className="flex gap-6 my-6">
          {!isObjectEmpty(props.fields.FirstImage.value) && (
            <div className="w-full">
              <NextImage
                className="max-h-[371px] h-full w-full object-cover"
                field={props.fields.FirstImage}
              />
            </div>
          )}
          {!isObjectEmpty(props.fields.SecondImage.value) && (
            <div className="w-full">
              <NextImage
                className="max-h-[371px] h-full w-full object-cover"
                field={props.fields.SecondImage}
              />
            </div>
          )}
          {!isObjectEmpty(props.fields.ThirdImage.value) && (
            <div className="w-full">
              <NextImage
                className="max-h-[371px] h-full w-full object-cover"
                field={props.fields.ThirdImage}
              />
            </div>
          )}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default RichTextWithImages;
