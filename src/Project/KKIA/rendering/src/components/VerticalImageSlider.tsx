import React from 'react';
import {
  Text as JssText,
  Image,
  LinkField,
  ImageField,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import SectionHeading from 'src/shared-components/SectionHeading';
import VerticalImageSliderCarousel from './ui/vertical-image-slider/VerticalImageSliderCarousel';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import AirplaneIconSvg from 'assets/icons/AirplaneIconSvg';
import Button from 'src/shared-components/Button';
export interface SiteLanguageFields {
  Image: ImageField;
}
export type ImageSliderItemProps = {
  fields: SiteLanguageFields;
};

export interface VerticalImageSliderFields {
  'Slider Title': Field<string>;
  'Main Title': Field<string>;
  Description: Field<string>;
  'Button Link': LinkField;
  Images: ImageSliderItemProps[];
}

export interface VerticalImageSliderProps {
  fields: VerticalImageSliderFields;
}
export const Default = (props: VerticalImageSliderProps): JSX.Element => {
  return (
    <div className="text-black w-full py-20 xl:px-4">
      <SectionPaddingWrapper>
        <div className="flex flex-col lg:flex-row items-stretch rtl:lg:flex-row-reverse">
          <div className="w-full lg:w-1/2 md:pr-10 flex flex-col rtl:md:pl-10 rtl:md:pr-0">
            <div className="flex items-center gap-[0.5rem] mb-4 rtl:justify-end">
              <div className="text-lightGreen text-base mr-1">
                <AirplaneIconSvg />
              </div>
              <span className="uppercase">
                <JssText field={props.fields['Slider Title']} />
              </span>
            </div>
            <div className="mt-4">
              <SectionHeading
                heading={props.fields['Main Title']}
                description={props.fields.Description}
              />
            </div>
            <Image
              field={props.fields.Images[0].fields.Image}
              className="w-full h-full lg:hidden py-8"
            />
            <Button
              variant="primary"
              field={props.fields['Button Link']}
              className="mt-8 self-center lg:self-start lg:rtl:self-end"
            />
          </div>
          <div className="w-full lg:w-1/2 max-h-[550px] hidden lg:flex relative select-none">
            <VerticalImageSliderCarousel
              images={[...props.fields.Images, ...props.fields.Images]}
            />
            <div className="z-0 absolute right-0 top-0 bottom-20 left-20 rtl:left-0 bg-lightGray"></div>
            <div className="z-50 -rotate-90 absolute bottom-10 -right-8 rtl:-left-8 rtl:right-auto">
              <ArrowGroup
                nextBtnClassName="verticalImageSlider-button-next"
                prevBtnClassName="verticalImageSlider-button-prev"
              />
            </div>
          </div>
        </div>
      </SectionPaddingWrapper>
    </div>
  );
};

export default Default;
