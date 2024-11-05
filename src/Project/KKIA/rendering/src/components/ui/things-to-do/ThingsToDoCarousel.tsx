import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ThingsToDoSliderItem from '../../../atom/ThingsToDoSliderItem';
import { ThingsToDoSliderItemProps } from 'src/atom/ThingsToDoSliderItem';

export default function ThingsToDoCarousel({ cards }: { cards: ThingsToDoSliderItemProps[] }) {
  return (
    <Swiper
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: '.thingsToDo-button-next',
        prevEl: '.thingsToDo-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
    >
      {cards?.map((card, index) => (
        <SwiperSlide key={index}>
          <ThingsToDoSliderItem fields={card.fields} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
