import React from 'react';
import { ImageField, Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import MoreResourcesCarousel from 'components/ui/more-resources-slider/MoreResourcesCarousel';
import MoreResourcesSliderItem from '../atom/MoreResourcesSliderItem';

export interface TransportPageFields {
  Image: ImageField;
  Name: TextField;
  Description: TextField;
}

export interface MoreResourcesSliderItemType {
  fields: TransportPageFields;
  url: string;
  id: string;
}

export interface MoreResourcesSliderProps {
  fields: {
    Slides: MoreResourcesSliderItemType[];
    Title: TextField;
    'Display Card Link': boolean;
  };
}

export const Default = ({ fields }: MoreResourcesSliderProps): JSX.Element => {
  const { Slides, Title, 'Display Card Link': displayCardLink } = fields;
  const resourceItems = fields.Slides;

  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="flex justify-between items-center mb-10">
        <JssText tag="h2" className="text-text-primary text-headline-h2" field={Title} />
        <div className="hidden md:block">
          <button className="c-main-slider__actions--btn moreResources-button-prev">
            <img src="/icons/hero-slider-arrow-left.svg" alt="previous slide" />
          </button>
          <button className="c-main-slider__actions--btn moreResources-button-next">
            <img src="/icons/hero-slider-arrow-right.svg" alt="next slide" />
          </button>
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-8">
        {Slides.map((slide) => (
          <MoreResourcesSliderItem
            key={slide.id}
            fields={slide.fields}
            itemUrl={slide.url}
            displayCardLink={displayCardLink}
          />
        ))}
      </div>
      <div className="max-md:hidden block">
        <MoreResourcesCarousel resources={resourceItems} />
      </div>
    </SectionPaddingWrapper>
  );
};

export const WithoutDescription = ({ fields }: MoreResourcesSliderProps): JSX.Element => {
  const { Slides, Title, 'Display Card Link': displayCardLink } = fields;
  const resourceItems = fields.Slides;

  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="flex justify-between items-center mb-10 rtl:flex-row-reverse">
        <JssText tag="h2" className="text-text-primary text-headline-h2" field={Title} />
        <div className="hidden md:block">
          <button className="c-main-slider__actions--btn moreResources-button-prev">
            <img src="/icons/hero-slider-arrow-left.svg" alt="previous slide" />
          </button>
          <button className="c-main-slider__actions--btn moreResources-button-next">
            <img src="/icons/hero-slider-arrow-right.svg" alt="next slide" />
          </button>
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-8">
        {Slides.map((slide) => (
          <MoreResourcesSliderItem
            key={slide.id}
            fields={{ ...slide.fields, Description: { value: '' } }}
            itemUrl={slide.url}
            displayCardLink={displayCardLink}
          />
        ))}
      </div>
      <div className="max-md:hidden block">
        <MoreResourcesCarousel resources={resourceItems} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default Default;
