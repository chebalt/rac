import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ImageCTARewardsItem from './ImageCTARewardsItem';
import { useRef } from 'react';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import sliderLayerImg from 'public/images/slider-layer.png';

type SlideType = {
  fields: {
    Image: ImageField;
  };
};

export default function ImageCTARewardsWithArrowsCarousel({ images }: { images: SlideType[] }) {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="w-full select-none">
      <div className="relative w-full h-full max-h-[352px]">
        <Swiper
          ref={swiperRef}
          className="h-[352px]"
          loop
          navigation={{
            nextEl: '.rewards-cta-w-arrows-slider-next',
            prevEl: '.rewards-cta-w-arrows-slider-prev',
          }}
          modules={[Navigation]}
          slidesPerView={1}
        >
          {images?.map((img, i) => (
            <SwiperSlide className="h-[352px]" key={i}>
              <ImageCTARewardsItem fields={img.fields} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
