import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import MainSliderCarousel from './MainSliderCarousel';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

export interface ISlide {
  fields: {
    Image: ImageField;
  };
}

interface MainSliderProps {
  slides: ISlide[];
  interval?: number;
}

const MainSlider = ({ slides }: MainSliderProps): JSX.Element => {
  return (
    <div className="w-full relative">
      <MainSliderCarousel images={slides} />
      <div className="absolute left-0 right-0 top-1/2 z-50">
        <SectionPaddingWrapper>
          <div className="w-full flex justify-end rtl:justify-start">
            <div className="w-full md:w-32 z-50">
              <ArrowGroup
                nextBtnClassName="mainSlider-button-next"
                prevBtnClassName="mainSlider-button-prev"
              />
            </div>
          </div>
        </SectionPaddingWrapper>
      </div>
    </div>
  );
};

export default MainSlider;
