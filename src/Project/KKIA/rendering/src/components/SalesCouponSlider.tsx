import React from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { SalesCoupon } from 'src/atom/SalesCoupon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ArrowInCircle from 'assets/icons/ArrowInCircle';

interface SalesCouponFields {
  Tag: TextField;
  Title: TextField;
  Description: TextField;
  Discount: TextField;
}

interface SalesCouponSliderFields {
  Coupons: Array<{
    fields: SalesCouponFields;
  }>;
}

type SalesCouponSliderProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  fields: SalesCouponSliderFields;
};

const SalesCouponSlider = (props: SalesCouponSliderProps): JSX.Element => {
  const coupons = props.fields.Coupons || [];

  return (
    <div className="pb-16 xl:ml-custom2 relative dir-rtl">
      <div className="w-[100vw]">
        <Swiper
          modules={[Navigation]}
          loop
          navigation={{
            nextEl: '.sales-coupon-slider-next',
            prevEl: '.sales-coupon-slider-prev',
          }}
          breakpoints={{
            0: {
              spaceBetween: 0,
            },
            768: {
              spaceBetween: 32,
            },
          }}
          slidesPerView="auto"
        >
          {[...coupons, ...coupons].map((coupon, index) => (
            <SwiperSlide key={index} className="md:!w-auto">
              <SalesCoupon fields={coupon.fields} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>{' '}
      <div className="sales-coupon-slider-pagination dir-ltr rtl:justify-start">
        <div className="sales-coupon-slider-prev hidden md:flex">
          <ArrowInCircle />
        </div>

        <div className="sales-coupon-slider-next">
          <ArrowInCircle />
        </div>
      </div>
    </div>
  );
};

export default SalesCouponSlider;
