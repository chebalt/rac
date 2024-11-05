import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProhibitedSliderItem from './ProhibitedSliderItem';
import { ProhibitedItem } from 'components/ProhibitedItemsSlider';
import { clsx } from 'clsx';

export default function ProhibitedItemSliderCarousel({ cards }: { cards: ProhibitedItem[] }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: '.prohibitedSlider-button-next',
        prevEl: '.prohibitedSlider-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 7,
          spaceBetween: 24,
        },
      }}
    >
      {cards?.map((card, index) => {
        const isDoubled = card.fields.IsDoubledImage.value;

        return (
          <SwiperSlide
            className={clsx({
              '!w-[324px]': isDoubled,
            })}
            key={index}
          >
            <ProhibitedSliderItem item={card} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
