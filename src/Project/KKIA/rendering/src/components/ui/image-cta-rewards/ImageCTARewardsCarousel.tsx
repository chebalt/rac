import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ImageCTARewardsItem from './ImageCTARewardsItem';
import { useEffect, useRef, useState } from 'react';
import SliderPagination from 'src/shared-components/SliderPagination';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import sliderLayerImg from 'public/images/slider-layer.png';

type SlideType = {
  fields: {
    Image: ImageField;
  };
};

export default function ImageCTARewardsCarousel({ images }: { images: SlideType[] }) {
  const [timeLeft, setTimeLeft] = useState(100);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const pauseIcon = '/icons/pause-icon.svg';
  const playIcon = '/icons/play-icon.svg';

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  useEffect(() => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.start();
      } else {
        swiperRef.current.swiper.autoplay.stop();
      }
    }
  }, [isPlaying]);

  return (
    <div className="w-full select-none">
      <div className="relative w-full h-[180px] md:h-[463px]">
        <Swiper
          ref={swiperRef}
          className="w-full h-full"
          autoplay={{ delay: 5000 }}
          loop
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onAutoplayTimeLeft={(swiper, time, percentage) => {
            setTimeLeft(percentage * 100);
          }}
        >
          {images?.map((img, i) => (
            <SwiperSlide key={i}>
              <ImageCTARewardsItem fields={img.fields} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden lg:block absolute top-0 bottom-0 left-0 z-50">
          <Image
            src={sliderLayerImg}
            width={301}
            height={463}
            alt="slider layer img"
            className="object-contain"
          />
        </div>
      </div>
      <div className="relative mt-10 flex justify-center text-xs">
        <SliderPagination
          progress={timeLeft}
          activePage={activeIndex}
          goToPage={(index) => slideTo(index)}
          totalPages={images.length}
        />
        <div className="absolute right-0 top-0 bottom-0 pb-2 rtl:right-auto rtl:left-0">
          <button onClick={() => setIsPlaying((prev) => !prev)}>
            <img src={isPlaying ? pauseIcon : playIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
