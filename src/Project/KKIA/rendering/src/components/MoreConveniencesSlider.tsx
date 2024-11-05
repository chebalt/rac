import React from 'react';
import MoreConveniencesSliderItem, {
  MoreConveniencesSliderItemProps,
} from './ui/more-conveniences-slider/MoreConveniencesSliderItem';
import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import MoreConveniencesSliderCarousel from './ui/more-conveniences-slider/MoreConveniencesSliderCarousel';

export interface MoreConveniencesSliderFields {
  Title: TextField;
  Slides: MoreConveniencesSliderItemProps[];
}

export interface MoreConveniencesSliderProps {
  fields: MoreConveniencesSliderFields;
}

const MoreConveniencesSlider = (props: MoreConveniencesSliderProps): JSX.Element => {
  return (
    <>
      <SectionPaddingWrapper className="pt-14 max-xl:pt-10">
        <div className="flex justify-between items-center mb-10 rtl:flex-row-reverse">
          <h3 className="text-text-primary text-headline-h2">
            <Text field={props.fields.Title} />
          </h3>
          <div className="select-none max-md:hidden">
            <ArrowGroup
              nextBtnClassName="moreConveniencesSlider-button-next"
              prevBtnClassName="moreConveniencesSlider-button-prev"
            />
          </div>
        </div>
      </SectionPaddingWrapper>
      <div className="w-[90%] m-auto pb-14 xl:w-auto xl:ml-custom rtl:xl:ml-0 rtl:xl:mr-[max(0px,(100vw-1320px)/2)] dir-rtl overflow-x-hidden">
        <div className="select-none xl:w-[100vw] w-full hidden md:block">
          <MoreConveniencesSliderCarousel
            cards={[...props.fields.Slides, ...props.fields.Slides]}
          />
        </div>
        <div className="block md:hidden">
          {props.fields.Slides.map((slideItem) => (
            <MoreConveniencesSliderItem key={slideItem.id} item={slideItem} />
          ))}{' '}
        </div>
      </div>
    </>
  );
};

export default MoreConveniencesSlider;
