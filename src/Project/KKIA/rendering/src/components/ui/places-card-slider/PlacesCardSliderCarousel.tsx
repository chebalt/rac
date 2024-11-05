import React, { useState, useRef } from 'react';
import {
  Text as JssText,
  ImageField,
  TextField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import SliderPagination from 'src/shared-components/SliderPagination';

export interface PlacesCardSliderTabFields {
  Title: TextField;
  Description: TextField;
  'First Place Image': ImageField;
  'First Image Title': TextField;
  'Second Place Image': ImageField;
  'Second Image Title': TextField;
  'Overlay Image': ImageField;
}

export interface PlacesCardItemProps {
  image: ImageField;
  id: string;
}

export type PlacesCardSliderTabProps = {
  fields: PlacesCardSliderTabFields;
};

const PlacesCardSliderCarousel: React.FC<PlacesCardSliderTabProps> = ({ fields }) => {
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const images = [
    { image: fields['First Place Image'], title: fields['First Image Title'], id: 1 },
    { image: fields['Second Place Image'], title: fields['Second Image Title'], id: 2 },
    { image: fields['First Place Image'], title: fields['First Image Title'], id: 3 },
    { image: fields['Second Place Image'], title: fields['Second Image Title'], id: 4 },
  ];

  const overlayImage = fields['Overlay Image'];

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <div className="w-full xl:w-[864px] flex flex-col xl:flex-row">
      <Swiper
        className="w-full h-full"
        ref={swiperRef}
        autoplay={{ delay: 5000 }}
        loop
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(swiper, time, percentage) => {
          setTimeLeft(percentage * 100);
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        navigation={{
          nextEl: '.placesCardSlider-button-next',
          prevEl: '.placesCardSlider-button-prev',
        }}
      >
        {images?.map((item, i) => (
          <SwiperSlide key={item.id + i}>
            <div className="relative h-[423px] lg:h-[516px] w-full lg:w-[40vw] xl:w-[418px]">
              {item.image && <NextImage field={item.image} fill />}
              {overlayImage && (
                <div
                  className="absolute top-0 left-0 right-0 bottom-0 opacity-70 bg-cover bg-[120%]"
                  style={{ backgroundImage: `url('${overlayImage.value?.src}')` }}
                />
              )}
              <div className="absolute bottom-0 right-0 p-[1rem]">
                <JssText
                  field={item.title}
                  className="text-[1.5rem] text-jade-light font-bold"
                  tag="p"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="xl:hidden relative w-full flex justify-center md:w-3/4 mx-auto mt-4">
        <div className="z-20 absolute top-0 bottom-0 flex items-center">
          <SliderPagination
            activePage={activeIndex}
            goToPage={slideTo}
            progress={timeLeft}
            totalPages={images.length}
          />
        </div>
        <ArrowGroup
          nextBtnClassName="placesCardSlider-button-next"
          prevBtnClassName="placesCardSlider-button-prev"
        />
      </div>
    </div>
  );
};

export default PlacesCardSliderCarousel;
