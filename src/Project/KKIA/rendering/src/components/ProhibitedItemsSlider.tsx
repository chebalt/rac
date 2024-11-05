import { RichText, Field, ComponentRendering, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import ArrowGroup from '../shared-components/ArrowGroup';
import ProhibitedItemSliderCarousel from 'components/ui/prohibited-items-slider/ProhibitedItemSliderCarousel';

export interface ProhibitedItem {
  fields: {
    Image: ImageField;
    Text: Field<string>;
    IsDoubledImage: Field<boolean>;
  };
}

export interface ProhibitedItemsSliderProps {
  rendering: ComponentRendering;
  fields: {
    Text: Field<string>;
    Slides: ProhibitedItem[];
  };
}

const ProhibitedItemsSlider = (props: ProhibitedItemsSliderProps): JSX.Element => {
  const slides = props.fields.Slides || [];

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div>
        <div className="flex justify-between items-center w-full mb-4 rtl:justify-end">
          <RichText tag="h6" className="text-muted-dark font-bold" field={props.fields.Text} />
          <div>
            <ArrowGroup
              customArrowClass="!p-4"
              arrowWidth="24px"
              arrowHeight="24px"
              nextBtnClassName="prohibitedSlider-button-next"
              prevBtnClassName="prohibitedSlider-button-prev"
            />
          </div>
        </div>
        <ProhibitedItemSliderCarousel cards={slides} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ProhibitedItemsSlider;
