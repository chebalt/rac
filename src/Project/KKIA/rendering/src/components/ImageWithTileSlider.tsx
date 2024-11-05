import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SliderTile, { SliderTileProps } from 'src/atom/SliderTile';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ArrowGroup from 'src/shared-components/ArrowGroup';

interface ImageWithTileSliderProps {
  rendering: ComponentRendering;
  fields: {
    Image: ImageField;
    Title: TextField;
    Description: TextField;
    Tiles: SliderTileProps[];
  };
}

const ImageWithTileSlider = (props: ImageWithTileSliderProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-10 md:flex-row">
        <JssImage
          field={props.fields.Image}
          className="w-full md:max-w-[321px] h-auto object-cover"
        />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <JssText
              field={props.fields.Title}
              tag="h2"
              className="text-text-primary text-headline-h2"
            />

            <JssText
              field={props.fields.Description}
              tag="p"
              className="text-text-secondary text-body-medium-light"
            />
          </div>
          <div className="flex flex-col gap-6 md:hidden">
            {props.fields.Tiles.map((tile, index) => (
              <SliderTile key={index} fields={tile.fields} />
            ))}
          </div>
          <div className="hidden md:flex flex-col gap-10 ">
            <Swiper
              spaceBetween={24}
              modules={[Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 'auto',
                },
              }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: '.slider-button-next',
                prevEl: '.slider-button-prev',
              }}
            >
              {props.fields.Tiles.map((tile, index) => (
                <SwiperSlide key={index} style={{ maxWidth: '400px' }}>
                  <SliderTile fields={tile.fields} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="max-w-[108px]">
              <ArrowGroup
                nextBtnClassName="slider-button-next"
                prevBtnClassName="slider-button-prev"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ImageWithTileSlider;
