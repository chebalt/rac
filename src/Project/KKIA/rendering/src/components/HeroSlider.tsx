import React from 'react';
import {
  ImageField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import MainSlider from 'components/ui/main-slider/MainSlider';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface Slide {
  fields: {
    Image: ImageField;
  };
}

interface HeroSliderProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    Slides?: Slide[];
  };
}

const HeroSlider = (props: HeroSliderProps): JSX.Element => {
  const slides = props.fields.Slides || [];
  const phKey = `kkia-pagecontent-heroslider-${props.params.DynamicPlaceholderId}`;
  return (
    <div className="w-full relative select-none">
      <MainSlider slides={slides} />
      <div className="md:absolute z-30 left-0 top-1/3 right-0">
        <SectionPaddingWrapper childrenClass="rtl:flex rtl:justify-end">
          <div className="lg:max-w-[530px]">
            <Placeholder name={phKey} rendering={props.rendering} />
          </div>
        </SectionPaddingWrapper>
      </div>
    </div>
  );
};

export default HeroSlider;
