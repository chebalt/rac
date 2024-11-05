import React from 'react';
import {
  Text,
  Field,
  ComponentRendering,
  ImageField,
  LinkField,
  Image as JssImage,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface ImageWithTextCTAProps {
  rendering: ComponentRendering;
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Description: Field<string>;
    CTALink: LinkField;
    CTAText: Field<string>;
  };
}

const ImageWithTextCTA = (props: ImageWithTextCTAProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="bg-jade-light py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-24">
        <div className="flex flex-col-reverse gap-10">
          <div className="flex flex-col md:hidden gap-4">
            <h3 className="font-bold text-[2rem] text-jade-darkest">
              <Text field={props.fields.Title} />
            </h3>
            <p className="font-normal text-lg text-muted-darker">
              <Text field={props.fields.Description} />
            </p>
          </div>
          <JssImage field={props.fields.Image} />
        </div>

        <div className="flex flex-col gap-6 justify-center ">
          <div className="hidden md:flex  flex-col gap-4">
            <h3 className="font-bold text-[2rem] text-jade-darkest">
              <Text field={props.fields.Title} />
            </h3>
            <p className="font-normal text-lg text-muted-darker">
              <Text field={props.fields.Description} />
            </p>
          </div>
          <JssLink
            field={props.fields.CTALink}
            className="px-6 py-4 text-jade-darker bg-primary-variant font-bold text-lg w-full md:w-fit text-center"
          />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ImageWithTextCTA;
