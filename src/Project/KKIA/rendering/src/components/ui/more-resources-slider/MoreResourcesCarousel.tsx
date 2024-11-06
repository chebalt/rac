import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { MoreResourcesSliderItemType } from 'components/MoreResourcesSlider';
import MoreResourcesSliderItem from '../../../atom/MoreResourcesSliderItem';

export default function MoreResourcesCarousel({
  resources,
  displayCardLink,
}: {
  resources: MoreResourcesSliderItemType[];
  displayCardLink: boolean | undefined;
}) {
  return (
    <Swiper
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: '.moreResources-button-next',
        prevEl: '.moreResources-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
    >
      {resources?.map((resource) => (
        <SwiperSlide key={resource.id}>
          <MoreResourcesSliderItem {...resource} itemUrl={resource.url} displayCardLink />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
