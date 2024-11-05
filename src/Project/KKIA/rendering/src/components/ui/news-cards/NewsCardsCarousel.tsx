import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NewsCardsItem from './NewsCardsItem';
import { NewsCardsItemProps } from 'components/NewsCards';

export default function NewsCardsCarousel({ cards }: { cards: NewsCardsItemProps[] }) {
  return (
    <Swiper
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: '.newsCards-button-next',
        prevEl: '.newsCards-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
    >
      {cards?.map((card, i) => (
        <SwiperSlide key={i}>
          <NewsCardsItem {...card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
