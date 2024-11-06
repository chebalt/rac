import clsx from 'clsx';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import ArrowTip from 'components/icons/ArrowTip';
import Close from 'components/icons/Close';
import ChevronRight from 'components/icons/ChevronRight';
import LanguageEnglish from 'components/icons/LanguageEnglish';
import LanguageArabic from 'components/icons/LanguageArabic';
import Sunny from 'components/icons/weather-icons/Sunny';
import Cloudy from 'components/icons/weather-icons/Cloudy';
import Snowy from 'components/icons/weather-icons/Snowy';
import Windy from 'components/icons/weather-icons/Windy';
import Thunderstorm from 'components/icons/weather-icons/Thunderstorm';
import Rainy from 'components/icons/weather-icons/Rainy';
import LightClouds from 'components/icons/weather-icons/LightClouds';
import weatherData from '../../../mockData/WeatherData.json';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface MobileMenuFields {
  links: LinkField[];
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  props: MobileMenuFields;
}

export default function MobileMenu({ isOpen, setIsOpen, props }: MobileMenuProps) {
  const [currentScreen, setCurrentScreen] = useState('Menu');

  const [temp, setTemp] = useState<number | undefined>(undefined);
  const [cityWeather, setCityWeather] = useState<string>('');
  setTemp(25);
  setCityWeather('Riyadh');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const currentLanguageTransformer = (language: string) => {
    return language === 'en' ? 'English' : 'Arabic';
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'sunny':
        return <Sunny className="h-8 w-8" />;
      case 'cloudy':
        return <Cloudy className="h-8 w-8" />;
      case 'snowy':
        return <Snowy className="h-8 w-8" />;
      case 'windy':
        return <Windy className="h-8 w-8" />;
      case 'thunderstorm':
        return <Thunderstorm className="h-8 w-8" />;
      case 'rainy':
        return <Rainy className="h-8 w-8" />;
      case 'light clouds':
        return <LightClouds className="h-8 w-8" />;
      default:
        return <Sunny className="h-8 w-8" />;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const renderScreens = () => {
    if (currentScreen === 'Menu') {
      return (
        <div>
          <button
            onClick={() => handleNavigation('Weather')}
            className="border-border-secondary flex w-full items-center justify-between border-b p-4"
          >
            <div className="flex items-center gap-2">
              <Sunny className="h-[22px] w-[22px]" />
              <span>{temp}°C</span>
              <span className="text-text-primary">{cityWeather}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-text-secondary" />
          </button>
          {props.links.map((page: LinkField) => (
            <Link
              key={page.value?.href}
              href={page.value?.href || ''}
              onClick={() => setIsOpen(false)}
              className="border-border-secondary flex items-center justify-between border-b p-4"
            >
              <span className="text-body-normal-regular text-text-primary">{page.value.text}</span>
              <ChevronRight className="h-4 w-4 text-text-secondary" />
            </Link>
          ))}
          <button
            onClick={() => handleNavigation('Language')}
            className="border-border-secondary flex w-full items-center justify-between border-b p-4"
          >
            <div className="flex items-center gap-2">
              {currentLanguage === 'en' ? <LanguageEnglish /> : <LanguageArabic />}
              <span className="text-text-primary">
                {currentLanguageTransformer(currentLanguage)}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
      );
    } else if (currentScreen === 'Weather') {
      return (
        <div className="px-4">
          <div className="text-body-normal-bold border-border-action-tertiary-default-2 flex items-center justify-between border-b py-3 text-text-primary">
            {cityWeather}
            <ArrowTip className="h-4 w-4 text-text-secondary" />
          </div>
          <div className="flex gap-5 pt-4">
            <Sunny className="h-20 w-20" />
            <div className="flex flex-col">
              <span className="text-body-extra-large-bold text-text-primary">25°C</span>
              <div className="flex gap-4">
                <span className="text-body-normal-bold text-text-primary">
                  {new Date()
                    .toLocaleDateString('en-US', {
                      weekday: 'long',
                      day: '2-digit',
                      month: '2-digit',
                    })
                    .replace(',', '')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex max-h-[450px] flex-col">
            {weatherData.map((weather, index) => (
              <div
                key={index}
                className="border-border-action-tertiary-default-2 flex w-full items-center justify-between gap-8 border-b py-4"
              >
                <span className="text-body-normal-bold text-text-primary">{weather.day}</span>
                <div className="flex items-center gap-2">
                  {getWeatherIcon(weather.weather)}
                  <span className="text-body-normal-light text-text-secondary">
                    {weather.temperature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (currentScreen === 'Language') {
      return (
        <div>
          <button
            onClick={() => setCurrentLanguage('en')}
            className="border-border-secondary flex w-full items-center justify-between border-b p-4"
          >
            <div className="flex items-center gap-2">
              <LanguageEnglish />

              <span className="text-text-primary">English</span>
            </div>
            <ChevronRight className="h-4 w-4 text-text-secondary" />
          </button>{' '}
          <button
            onClick={() => setCurrentLanguage('ar')}
            className="border-border-secondary flex w-full items-center justify-between border-b p-4"
          >
            <div className="flex items-center gap-2">
              <LanguageArabic />

              <span className="text-text-primary">Arabic</span>
            </div>
            <ChevronRight className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={clsx('absolute left-0 top-0 z-50 h-full w-full bg-surface-primary', {
        hidden: !isOpen,
      })}
    >
      <div className="border-border-secondary flex items-center justify-between border-b p-4">
        {currentScreen !== 'Menu' && (
          <button onClick={() => setCurrentScreen('Menu')} className="flex items-center">
            <ChevronRight className="h-6 w-6 rotate-180 text-text-secondary" />
          </button>
        )}
        <h2 className="text-body-normal-bold text-text-primary">{currentScreen}</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="flex h-6 w-6 items-center justify-center"
        >
          <Close className="h-6 w-6 text-text-secondary" />
        </button>
      </div>
      <div>{renderScreens()}</div>
    </div>
  );
}
