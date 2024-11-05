import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import CardSliderCTAItem from './CardSliderCTAItem';
import { CardSliderCTASlide } from 'components/CardSliderCTA';
import { useRef, useState } from 'react';
import SliderPagination from 'src/shared-components/SliderPagination';
import ArrowGroup from 'src/shared-components/ArrowGroup';

type CardSliderCTACarouselProps = {
  cards: CardSliderCTASlide[];
};

export default function CardSliderCTACarousel({ cards }: CardSliderCTACarouselProps) {
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <div className="w-full">
      <Swiper
        ref={swiperRef}
        className="w-full h-full"
        autoplay={{ delay: 5000 }}
        loop
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.cardSLiderCTA-button-next',
          prevEl: '.cardSLiderCTA-button-prev',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(swiper, time, percentage) => {
          setTimeLeft(percentage * 100);
        }}
      >
        {cards?.map((card, i) => (
          <SwiperSlide key={card.id + i}>
            <CardSliderCTAItem item={card} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lg:hidden relative w-full flex justify-center items-center py-8">
        <SliderPagination
          progress={timeLeft}
          activePage={activeIndex}
          goToPage={(index) => slideTo(index)}
          totalPages={cards.length}
        />
        <div className="absolute left-0 right-0">
          <ArrowGroup
            nextBtnClassName="cardSLiderCTA-button-next"
            prevBtnClassName="cardSLiderCTA-button-prev"
          />
        </div>
      </div>
    </div>
  );
}
