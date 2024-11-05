import React from 'react';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ISlide } from './MainSlider';

const MainSliderItem = ({ item }: { item: ISlide }): JSX.Element => {
  return (
    <div className="relative z-30 w-full min-h-[332px] md:min-h-[670px] max-h-[670px]">
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[rgba(13,27,26,0.7)] to-[rgba(13,27,26,0.7)] z-10"></div>
      <NextImage
        field={item.fields?.Image}
        priority
        width={0}
        height={0}
        sizes="100vw"
        className="hidden 2xl:block w-full lg:object-cover max-h-[670px] h-full"
      />
      <NextImage
        field={item.fields?.Image}
        priority
        fill
        className="2xl:hidden w-full object-cover"
      />
    </div>
  );
};

export default MainSliderItem;
