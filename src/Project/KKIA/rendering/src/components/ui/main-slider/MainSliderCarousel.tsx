import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import MainSliderItem from './MainSliderItem';
import { ISlide } from './MainSlider';
import { useRef, useState } from 'react';
import SliderPagination from 'src/shared-components/SliderPagination';

export default function MainSliderCarousel({ images }: { images: ISlide[] }) {
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        className="w-full h-full"
        autoplay={{ delay: 5000 }}
        loop
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.mainSlider-button-next',
          prevEl: '.mainSlider-button-prev',
        }}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(swiper, time, percentage) => {
          setTimeLeft(percentage * 100);
        }}
      >
        {images?.map((img, i) => (
          <SwiperSlide key={i}>
            <MainSliderItem item={img} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-20 bottom-0 left-0 right-0 p-6 lg:p-16 flex justify-center text-xs">
        <SliderPagination
          progress={timeLeft}
          activePage={activeIndex}
          goToPage={(index) => slideTo(index)}
          totalPages={images.length}
        />
      </div>
    </div>
  );
}
