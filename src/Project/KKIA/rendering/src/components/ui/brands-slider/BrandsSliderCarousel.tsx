import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BrandsSliderItem from './BrandsSliderItem';
import { BrandsSliderItemProps } from 'components/BrandsSlider';

export default function BrandSliderCarousel({ cards }: { cards: BrandsSliderItemProps[] }) {
  return (
    <Swiper
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: '.brandSlider-button-next',
        prevEl: '.brandSlider-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
    >
      {cards?.map((card, i) => (
        <SwiperSlide key={card.id + i}>
          <BrandsSliderItem item={card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
