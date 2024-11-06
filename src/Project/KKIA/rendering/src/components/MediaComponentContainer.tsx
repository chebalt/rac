import React from 'react';
import {
  Text,
  Field,
  Image as JssImage,
  ComponentRendering,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CustomLink from 'src/shared-components/CustomLink';

interface MediaItem {
  fields: {
    VideoSource?: Field<string>;
    Image?: ImageField;
    Description: Field<string>;
  };
}

interface MediaComponentContainerProps {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    SubTitle?: Field<string>;
    Link: LinkField;
    Items: MediaItem[];
  };
}

export const Default = (props: MediaComponentContainerProps): JSX.Element => {
  const videos = props.fields.Items || [];
  return (
    <div className={`component`}>
      <div className="component-content">
        <Text field={props.fields.Title} />
        <div className="block">
          {videos.map((video) => (
            <>
              <Text
                key={video.fields?.Image?.value?.src?.length}
                field={video.fields.VideoSource}
              />
              <Text field={video.fields.Description} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VideoComponent = (props: MediaComponentContainerProps): JSX.Element => {
  const videos = props.fields.Items || [];
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-4">
        <Text
          field={props.fields.Title}
          tag="p"
          className="text-text-secondary text-body-medium-regular"
        />
        <div className="flex flex-col md:flex-row gap-6">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col gap-3 items-center">
              <div className="max-w-[380px] max-h-[190px]">
                <iframe
                  width="380"
                  height="190"
                  src={video.fields?.VideoSource?.value || ''}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <Text
                field={video.fields.Description}
                className="text-body-medium-light text-text-secondary"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const ImageComponent = (props: MediaComponentContainerProps): JSX.Element => {
  const images = props.fields.Items || [];
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div>
        <Text tag="p" className="text-muted-dark font-light mb-6" field={props.fields.Title} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map((image, index) => (
            <div className="flex items-center flex-col gap-3" key={index}>
              <JssImage
                class="max-h-[170px] h-full w-full object-cover"
                field={image.fields.Image}
              />
              <Text
                tag="span"
                className="text-sm text-muted-dark font-light text-center"
                field={image.fields.Description}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const ImageGallery = (props: MediaComponentContainerProps): JSX.Element => {
  const images = props.fields.Items || [];
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div>
        <Text tag="h2" className="text-muted-dark font-light mb-6" field={props.fields.Title} />
        <Text tag="p" className="text-muted-dark font-light mb-6" field={props.fields.SubTitle} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map((image, index) => (
            <div className="flex items-center flex-col gap-3" key={index}>
              <JssImage field={image.fields.Image} />
              <Text
                tag="span"
                className="text-sm text-muted-dark font-light"
                field={image.fields.Description}
              />
            </div>
          ))}
        </div>
        <CustomLink field={props.fields?.Link} />
      </div>
    </SectionPaddingWrapper>
  );
};

export const ImageGalleryWithoutMainPhoto = (props: MediaComponentContainerProps): JSX.Element => {
  const images = props.fields.Items || [];
  return (
    <div className="w-full py-10 md:py-14">
      <div className="w-[95%] xl:w-full max-w-[1320px] ml-auto lg:mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-24 overflow-x-auto">
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            <div className="flex flex-col gap-4 ">
              <Text
                field={props.fields.Title}
                tag="h3"
                className="text-headline-h2 text-text-primary"
              />
              <Text
                field={props.fields.SubTitle}
                tag="p"
                className="text-body-medium-light text-text-secondary"
              />
            </div>
            <div className="max-w-[108px] hidden md:block">
              <ArrowGroup
                nextBtnClassName="slider-button-next"
                prevBtnClassName="slider-button-prev"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Swiper
              spaceBetween={32}
              modules={[Navigation]}
              loop
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
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full h-full object-cover max-h-[239px] md:max-h-[308px] md:max-w-[467px]"
                >
                  <JssImage field={image.fields.Image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
