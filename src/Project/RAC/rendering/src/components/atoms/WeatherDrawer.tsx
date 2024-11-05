import { useState, useEffect, useRef } from 'react';
import ArrowTip from 'components/icons/ArrowTip';
import clsx from 'clsx';
import Sunny from 'components/icons/weather-icons/Sunny';
import Cloudy from 'components/icons/weather-icons/Cloudy';
import Snowy from 'components/icons/weather-icons/Snowy';
import Windy from 'components/icons/weather-icons/Windy';
import Thunderstorm from 'components/icons/weather-icons/Thunderstorm';
import Rainy from 'components/icons/weather-icons/Rainy';
import LightClouds from 'components/icons/weather-icons/LightClouds';

import weatherData from '../../../mockData/WeatherData.json';

interface WeatherDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function WeatherDrawer({ isOpen, toggleDrawer }: WeatherDrawerProps) {
  const [temp, setTemp] = useState<number | undefined>(undefined);
  const [cityWeather, setCityWeather] = useState<string>('');
  setTemp(25);
  setCityWeather('Riyadh');

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  return (
    <div
      ref={drawerRef}
      className="text-body-extra-small-regular hover:text-text-action-secondary-hover active:text-text-action-secondary-press relative flex cursor-pointer items-center gap-1 px-4 py-2 text-text-action-secondary-default"
      onClick={toggleDrawer}
    >
      <span>
        <Sunny className="h-[22px] w-[22px]" />
      </span>
      <span>{temp}°C</span>
      {cityWeather}
      <ArrowTip
        className={clsx('h-4 w-4 transition-transform', {
          'rotate-180': isOpen,
        })}
      />
      <div
        className={clsx(
          'absolute right-0 top-full z-30 flex h-[256px] w-fit flex-col justify-between bg-surface-primary p-5 shadow-pressed',
          { hidden: !isOpen }
        )}
      >
        <div className="flex gap-5">
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
              <div className="text-body-normal-bold text-text-primary">
                <span className="text-body-normal-light text-text-primary">Selected City: </span>
                {cityWeather}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          {weatherData.map((weather, index) => (
            <div
              key={index}
              className="flex w-[113px] flex-col items-center gap-8 border-r border-border-action-tertiary-default px-3"
            >
              <span className="text-body-normal-bold text-text-primary">{weather.day}</span>
              <div className="flex flex-col items-center gap-2">
                {getWeatherIcon(weather.weather)}
                <span className="text-body-normal-light text-text-secondary">
                  {weather.temperature}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
