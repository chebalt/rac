'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef, useState } from 'react';

import {
  Text as JssText,
  Image as JssImage,
  TextField,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import Button from 'components/atoms/Button';
import ArrowButton from 'components/atoms/ArrowButton';
import IndicatorsGroup from 'components/molecules/IndicatorsGroup';

import Telescope from 'components/icons/Telescope';
import User from 'components/icons/User';
import Pause from 'components/icons/Pause';
import Play from 'components/icons/Play';
import ArrowLeft from 'components/icons/ArrowLeft';
import ArrowRight from 'components/icons/ArrowRight';

interface MainHeroProps {
  fields: {
    images: ImageField[];
    title: TextField;
    description: TextField;
    links: LinkField[];
  };
}

export default function MainHero({ fields }: MainHeroProps) {
  console.log('Main Hero', fields);

  const SLIDER_TIMER = 5000;

  const swiperRef = useRef<SwiperRef>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="relative mx-auto hidden h-[640px] w-full flex-col justify-end bg-surface-secondary-invert md:flex">
        <div className="z-20 mx-auto flex h-[412px] w-full max-w-[1440px] items-end justify-between gap-24 px-24 py-14">
          <div className="flex flex-col gap-10">
            <JssText tag="h1" className="text-headline-h1 text-text-invert" field={fields.title} />
            <div className="flex gap-6">
              <Button
                size="default"
                variant="primary"
                leftIcon={<Telescope />}
                field={fields.links[0]}
              />
              <Button
                size="default"
                variant="secondary"
                leftIcon={<User />}
                field={fields.links[1]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <JssText
              tag="p"
              className="text-body-medium-regular text-text-invert"
              field={fields.description}
            />
            <ArrowButton direction="down" size="large" onClick={() => scrollTo('about')} />
          </div>
        </div>
        <div className="z-20 flex h-[76px] w-full flex-col justify-end">
          <div className="flex h-[40px] w-[120px] items-center justify-between bg-[#FFFFFF3D]">
            <button className="custom-button-prev h-10 w-10 cursor-pointer border-none bg-none p-2">
              <ArrowLeft className="h-6 w-6 text-icon-action-primary" />
            </button>
            {isPlaying ? (
              <button
                className="h-10 w-10 border-none bg-none p-2"
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.swiper.autoplay.stop();
                  }

                  setIsPlaying(false);
                }}
              >
                <Pause className="h-6 w-6 text-icon-action-primary" />
              </button>
            ) : (
              <button
                className="h-10 w-10 border-none bg-none p-2"
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.swiper.autoplay.start();
                  }

                  setIsPlaying(true);
                }}
              >
                <Play className="h-6 w-6 text-icon-action-primary" />
              </button>
            )}
            <button className="custom-button-next h-10 w-10 cursor-pointer border-none bg-none p-2">
              <ArrowRight className="h-6 w-6 text-icon-action-primary" />
            </button>
          </div>
          <div className="flex h-[12px] w-full bg-[#FFFFFF3D]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-full border-r bg-surface-secondary"
                style={{
                  width: `${
                    index < activeIndex
                      ? 25
                      : index === activeIndex
                      ? ((100 - timeLeft) / 100) * 25
                      : 0
                  }%`,
                  transition: 'width 0.5s linear',
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 z-0 h-full w-full">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay, Pagination]}
            slidesPerView={1}
            autoplay={{ delay: SLIDER_TIMER, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.custom-button-next',
              prevEl: '.custom-button-prev',
            }}
            loop
            className="h-full w-full"
            onAutoplayStop={() => {
              setIsPlaying(false);
            }}
            onAutoplayStart={() => {
              setIsPlaying(true);
            }}
            onSlideChange={(swiper: any) => setActiveIndex(swiper.realIndex)}
            onAutoplayTimeLeft={(_s: any, _t: any, percentage: any) => {
              setTimeLeft(percentage * 100);
            }}
          >
            {fields.images.map((image, index) => (
              <SwiperSlide key={index}>
                <JssImage
                  field={image}
                  priority
                  width={1440}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-blue-overlay"></div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden">
        <div className="relative mx-auto flex h-[380px] w-full max-w-[767px] flex-col justify-end bg-surface-secondary-invert">
          <div className="pointer-events-auto absolute left-0 top-0 z-0 h-full w-full">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay, Pagination]}
              slidesPerView={1}
              slidesPerGroup={1}
              autoplay={{ delay: SLIDER_TIMER, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: '.custom-button-next',
                prevEl: '.custom-button-prev',
              }}
              loop
              className="h-full w-full"
              onAutoplayStop={() => {
                setIsPlaying(false);
              }}
              onAutoplayStart={() => {
                setIsPlaying(true);
              }}
              onSlideChange={(swiper: any) => setActiveIndex(swiper.realIndex)}
              onAutoplayTimeLeft={(_s: any, _t: any, percentage: any) => {
                setTimeLeft(percentage * 100);
              }}
            >
              {fields.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <JssImage
                    field={image}
                    priority
                    width={767}
                    height={380}
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="absolute bottom-0 left-0 z-20 flex h-[48px] w-full items-end justify-center">
            <IndicatorsGroup
              count={fields.images.length}
              onClick={slideTo}
              activeIndex={activeIndex}
              progress={timeLeft}
            />
          </div>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-blue-overlay"></div>
        </div>

        <div className="flex justify-between gap-24 px-4 py-10">
          <div className="flex flex-col gap-10">
            <JssText tag="h1" className="text-headline-h1 text-ocean-700" field={fields.title} />
            <div className="flex flex-col gap-6">
              <Button
                size="default"
                variant="primary"
                leftIcon={<Telescope />}
                field={fields.links[0]}
              />
              <Button
                size="default"
                variant="secondary"
                leftIcon={<User />}
                field={fields.links[1]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
