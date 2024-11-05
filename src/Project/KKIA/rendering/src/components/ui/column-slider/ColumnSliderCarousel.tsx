import React, { useState, useRef } from 'react';
import { TextField, LinkField, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import ColumnSliderItem, { ColumnSliderItemProps } from './ColumnSliderItem';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import SliderPagination from 'src/shared-components/SliderPagination';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import SecondaryButton from 'src/shared-components/SecondaryButton';

export interface ColumnSliderTabFields {
  'Tab Title': TextField;
  Title: TextField;
  Description: TextField;
  'Button Link': LinkField;
  'Column Slider Items': ColumnSliderItemProps[];
}

export type ColumnSliderTabProps = {
  fields: ColumnSliderTabFields;
};

const ColumnSliderCarousel = (props: ColumnSliderTabProps): JSX.Element => {
  const columns = props.fields['Column Slider Items'];
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  const getSlideNumber = (columnId: string) => {
    return columns.findIndex((column) => column.id === columnId) + 1;
  };

  return (
    <div className="relative flex flex-col lg:flex-row rtl:lg:flex-row-reverse">
      <div className="c-column-slider-tab__text rtl:items-end w-full min-w-[335px] lg:mr-24 rtl:lg:mr-0 rtl:lg:ml-24">
        <div className="flex flex-col gap-6">
          <h2 className="c-column-slider-tab__text--title">
            <Text field={props.fields.Title} />
          </h2>
          <p className="c-column-slider-tab__text--description">
            <Text field={props.fields.Description} />
          </p>
        </div>
        <Link className="c-column-slider-tab__text--btn" field={props.fields['Button Link']} />
      </div>
      <div className="relative select-none w-full xl:w-[80vw]">
        <Swiper
          ref={swiperRef}
          className="w-full h-full"
          autoplay={{ delay: 5000 }}
          loop
          modules={[Navigation, Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onAutoplayTimeLeft={(swiper, time, percentage) => {
            setTimeLeft(percentage * 100);
          }}
          navigation={{
            nextEl: '.columnSlider-button-next',
            prevEl: '.columnSlider-button-prev',
          }}
        >
          {columns?.map((item, i) => (
            <SwiperSlide key={i}>
              <ColumnSliderItem
                fields={item.fields}
                slideNumber={getSlideNumber(item.id)}
                totalSlides={columns.length}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden lg:flex absolute right-0 top-[28%] z-50 mr-custom rtl:mr-auto rtl:w-full">
        <SectionPaddingWrapper className="rtl:w-auto">
          <ArrowGroup
            nextBtnClassName="columnSlider-button-next"
            prevBtnClassName="columnSlider-button-prev"
          />
        </SectionPaddingWrapper>
      </div>
      <div className="lg:hidden relative flex justify-center items-center text-xs py-6">
        <SliderPagination
          progress={timeLeft}
          activePage={activeIndex}
          goToPage={(index) => slideTo(index)}
          totalPages={columns.length}
        />
        <div className="absolute left-0 right-0">
          <ArrowGroup
            nextBtnClassName="columnSlider-button-next"
            prevBtnClassName="columnSlider-button-prev"
          />
        </div>
      </div>
      <div className="lg:hidden w-full flex justify-center  mt-4">
        <SecondaryButton field={props.fields['Button Link']} />
      </div>
    </div>
  );
};

export default ColumnSliderCarousel;
