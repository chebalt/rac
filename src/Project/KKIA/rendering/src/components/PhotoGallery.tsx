import React, { useRef, useState } from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ComponentRendering,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'tailwindcss/tailwind.css';
import ArrowGroup from '../shared-components/ArrowGroup';
import SliderPagination from '../shared-components/SliderPagination';
import { SwiperRef } from 'swiper/swiper-react';
import Button from '../shared-components/Button';

type PhotoGalleryItem = {
  fields: {
    Image: ImageField;
  };
};

interface PhotoGalleryProps {
  rendering: ComponentRendering;
  fields: {
    Photos: PhotoGalleryItem[];
    Title: TextField;
    Description: TextField;
    Link: LinkField;
  };
}

export const Default = (props: PhotoGalleryProps): JSX.Element => {
  const { Title, Photos } = props.fields;
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <div className="py-10 md:py-14 xl:ml-custom rtl:xl:ml-0 rtl:xl:mr-[max(0px,(90%-1320px)/2)] overflow-x-hidden relative max-lg:w-[90%] max-lg:mx-auto">
      <JssText field={Title} tag="h2" className="text-text-primary text-headline-h2 mb-10" />

      <div className="w-full relative min-h-[367px] dir-rtl">
        <Swiper
          ref={swiperRef}
          className="w-full h-full relative"
          wrapperClass="items-center"
          autoplay={{ delay: 5000 }}
          loop
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.photoGallery-button-next',
            prevEl: '.photoGallery-button-prev',
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onAutoplayTimeLeft={(swiper, time) => {
            setTimeLeft((time / swiper.params.autoplay.delay) * 100);
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
        >
          {Photos?.map((photoItem, index) => (
            <SwiperSlide key={index}>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'h-[367px]' : 'h-[239px]'
                }`}
              >
                <JssImage className="w-full h-full object-cover" field={photoItem.fields.Image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between absolute right-24 bottom-0 z-10 max-lg:hidden left-[35%] w-[60%] rtl:left-0 rtl:right-[35%]">
          <SliderPagination
            progress={timeLeft}
            activePage={activeIndex}
            goToPage={(index) => slideTo(index)}
            totalPages={props.fields.Photos.length}
          />
          <div className="dir-ltr">
            <ArrowGroup
              nextBtnClassName="photoGallery-button-next"
              prevBtnClassName="photoGallery-button-prev"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const GalleryWithDescription = (props: PhotoGalleryProps): JSX.Element => {
  const { Title, Description, Photos } = props.fields;
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="py-10 md:py-14 xl:ml-custom overflow-x-hidden relative max-lg:w-[90%] max-lg:mx-auto">
      <div className="w-full relative min-h-[487px]">
        <div className="lg:absolute lg:right-24 lg:top-0 z-10 lg:left-[35%] lg:w-[60%] mb-10">
          <JssText field={Title} tag="h2" className="text-headline-h2 mb-2 rtl:!text-left" />
          <JssText field={Description} tag="h2" className="body-medium-light rtl:!text-left" />
        </div>
        <Swiper
          ref={swiperRef}
          className="w-full h-full relative"
          wrapperClass="items-center"
          autoplay={{ delay: 5000 }}
          loop
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.photoGallery-button-next',
            prevEl: '.photoGallery-button-prev',
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onAutoplayTimeLeft={(swiper, time) => {
            setTimeLeft((time / swiper.params.autoplay.delay) * 100);
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
        >
          {Photos?.map((photoItem, index) => (
            <SwiperSlide key={index}>
              <div
                className={`transition-all duration-100 ease-in-out ${
                  activeIndex === index ? 'lg:h-[487px] h-[282]' : 'h-[239px]'
                }`}
              >
                <JssImage className="w-full h-full object-cover" field={photoItem.fields.Image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between lg:absolute lg:right-24 lg:bottom-0 z-10 lg:left-[35%] lg:w-[60%] mt-10 lg:mt-0">
          <div>
            <ArrowGroup
              nextBtnClassName="photoGallery-button-next"
              prevBtnClassName="photoGallery-button-prev"
            />
          </div>
          <Button className="w-auto" field={props.fields.Link} variant="primary" size="default" />
        </div>
      </div>
    </div>
  );
};
