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
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import CustomLink from 'src/shared-components/CustomLink';

interface DirectionsBannerProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Link: LinkField;
    Image: ImageField;
  };
}

const DirectionsBanner = (props: DirectionsBannerProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14 bg-jade-light">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-[2rem] font-bold text-jade-darkest">
              <JssText field={props.fields.Title} />
            </h2>
            <p className="text-lg font-normal text-muted-darker">
              <JssText field={props.fields.Description} />
            </p>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-2">
            <CustomLink
              field={props.fields.Link}
              className="text-lg font-bold text-primary-dark-green text-center md:text-left"
            />
            <ArrowRightSvg className="text-jade-darker" />
          </div>
        </div>
        <div>
          <JssImage field={props.fields.Image} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default DirectionsBanner;
