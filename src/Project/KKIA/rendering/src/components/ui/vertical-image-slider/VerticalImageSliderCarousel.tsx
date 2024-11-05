import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ImageSliderItemProps } from 'components/VerticalImageSlider';
import VerticalImageSliderItem from './VerticalImageSliderItem';

export default function VerticalImageSliderCarousel({
  images,
}: {
  images: ImageSliderItemProps[];
}) {
  return (
    <Swiper
      className="w-full h-full"
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: '.verticalImageSlider-button-next',
        prevEl: '.verticalImageSlider-button-prev',
      }}
      slidesPerView={1}
      direction="vertical"
    >
      {images?.map((img, i) => (
        <SwiperSlide key={i}>
          <VerticalImageSliderItem item={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
