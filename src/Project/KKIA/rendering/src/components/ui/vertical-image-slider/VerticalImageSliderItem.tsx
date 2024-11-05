import React from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ImageSliderItemProps } from 'components/VerticalImageSlider';

const VerticalImageSliderItem = ({ item }: { item: ImageSliderItemProps }): JSX.Element => {
  return (
    <Image field={item.fields.Image} className="z-10 h-[470px] w-[558px] mt-10 rtl:float-right" />
  );
};

export default VerticalImageSliderItem;
