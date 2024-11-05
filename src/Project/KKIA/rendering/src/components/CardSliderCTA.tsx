import React from 'react';
import {
  Text,
  Field,
  ComponentRendering,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardSliderCTACarousel from './ui/card-slider-cta/CardSliderCTACarousel';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import SuitcaseIconSvg from 'assets/icons/SuitcaseIconSvg';
import SecondaryButton from 'src/shared-components/SecondaryButton';
import ArrowGroup from 'src/shared-components/ArrowGroup';

export type CardSliderCTASlide = {
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Description: Field<string>;
  };
  id: string;
};

interface CardSliderCTAProps {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Slides: CardSliderCTASlide[];
    CTALink: LinkField;
    CTAText: Field<string>;
  };
}

const CardSliderCTA = (props: CardSliderCTAProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="w-full bg-lightGray py-16 xl:px-4">
      <div className="flex items-center gap-[0.5rem] mb-[1rem] rtl:justify-end">
        <div className="text-lightGreen text-base mr-1">
          <SuitcaseIconSvg />
        </div>
        <span className="uppercase">
          <Text field={props.fields.Title} />
        </span>
      </div>
      <div className="flex justify-between items-center mb-[3rem] rtl:flex-row-reverse">
        <h3 className="font-bold text-muted-darkest text-[2.25rem]">
          <Text field={props.fields.SubTitle} />
        </h3>
        <div className="max-xl:hidden flex gap-[0.5rem]">
          <ArrowGroup
            nextBtnClassName="cardSLiderCTA-button-next"
            prevBtnClassName="cardSLiderCTA-button-prev"
          />
        </div>
      </div>
      <div className="select-none">
        <CardSliderCTACarousel cards={[...props.fields.Slides, ...props.fields.Slides]} />
      </div>
      <div>
        <div className="mt-16 flex justify-center">
          <SecondaryButton field={props.fields.CTALink} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default CardSliderCTA;
