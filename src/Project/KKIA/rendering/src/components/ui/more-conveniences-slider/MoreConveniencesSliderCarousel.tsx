import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MoreConveniencesSliderItem from './MoreConveniencesSliderItem';
import { MoreConveniencesSliderItemProps } from './MoreConveniencesSliderItem';

export default function MoreConveniencesSliderCarousel({
  cards,
}: {
  cards: MoreConveniencesSliderItemProps[];
}) {
  return (
    <Swiper
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: '.moreConveniencesSlider-button-next',
        prevEl: '.moreConveniencesSlider-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        786: {
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
          <MoreConveniencesSliderItem item={card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
