import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Image as JssImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

import { Swiper as SwiperType } from 'swiper/types';

interface ShopImageProps {
  fields: {
    Image: ImageField;
  };
}

interface ShopPicturesCarouselProps {
  images: ShopImageProps[];
}

const ShopPicturesCarousel = ({ images }: ShopPicturesCarouselProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div>
      <Swiper
        loop
        modules={[Navigation]}
        navigation={{
          nextEl: '.shopSlider-button-next',
          prevEl: '.shopSlider-button-prev',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
        }}
        onSlideChange={(swiper: SwiperType) => setCurrentSlide(swiper.realIndex + 1)}
      >
        {images.map((shopImage, index) => (
          <SwiperSlide key={index}>
            <JssImage
              className="xl:max-h-[367px] object-cover w-auto"
              field={shopImage.fields.Image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-between items-center pb-4 mt-6">
        <div className="select-none text-lightGreen3 flex flex-row justify-between items-center w-full">
          <p className="px-3 py-2 text-primary-dark-green bg-jade-light">
            {currentSlide}/{images.length}
          </p>
          <ArrowGroup
            nextBtnClassName="shopSlider-button-next"
            prevBtnClassName="shopSlider-button-prev"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPicturesCarousel;
