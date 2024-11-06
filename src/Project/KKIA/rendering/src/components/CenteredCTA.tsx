import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import CustomLink from 'src/shared-components/CustomLink';

interface CenteredCTAProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Image: ImageField;
    Link: LinkField;
  };
}

const CenteredCTA = (props: CenteredCTAProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14 relative">
      <div className="relative md:max-h-[296px]">
        <JssImage
          field={props.fields.Image}
          className="w-full h-full object-cover min-h-[428px] md:min-h-[0px] md:max-h-[296px]"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-overlay flex flex-col justify-center items-center text-center p-14">
          <JssText
            field={props.fields.Title}
            tag="h3"
            className="text-jade-light text-[2rem] text-center font-bold mb-6"
          />
          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-jade-light text-lg text-center font-light mb-6"
          />
          <CustomLink
            field={props.fields.Link}
            className="bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-jade-darker font-normal text-lg py-4 px-6 w-full md:w-fit flex items-center justify-center"
          />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default CenteredCTA;
