import React, { useState, useEffect, useRef } from 'react';
import ArrowTip from 'components/icons/ArrowTip';
import clsx from 'clsx';
import Sunny from 'components/icons/weather-icons/Sunny';
import Cloudy from 'components/icons/weather-icons/Cloudy';
import Snowy from 'components/icons/weather-icons/Snowy';
import Windy from 'components/icons/weather-icons/Windy';
import Thunderstorm from 'components/icons/weather-icons/Thunderstorm';
import Rainy from 'components/icons/weather-icons/Rainy';
import LightClouds from 'components/icons/weather-icons/LightClouds';

import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CityFields } from 'components/atoms/Cities';
import axios from 'axios';
import { useI18n } from 'next-localization';

import { Icon, IconType } from 'components/atoms/Icons';
import { ForecastAPIResponse } from 'src/types/forecast.type';

import { mapWeatherIcon, objectWeatherIconKey } from 'lib/weatherIcon';
import { format } from 'date-fns';

interface CityItemFields {
  Cities: Array<Cities>;
}

interface Cities {
  fields: CityFields;
}

type WeatherDrawerProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: CityItemFields;
  renderingContext: {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
  };
};

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  date: Date;
}

interface ForecastDay {
  dt: number;
  dt_txt: string;
  weather: Array<{
    main: string;
    icon: string;
  }>;
  main: {
    temp: number;
  };
}

interface WeatherForecast {
  list: ForecastDay[];
}

export const Default = (props: WeatherDrawerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { locale } = useI18n();
  const [selectedLocation, setSelectedLocation] = useState({ lat: '24.6700', lng: '46.6900' });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);

  const weatherDrawerRef = useRef<HTMLDivElement>(null);

  const fetchWeather = async () => {
    if (!selectedLocation.lat || !selectedLocation.lng) return;
    setIsLoading(true);
    try {
      const api_key = process.env.NEXT_PUBLIC_WEATHER_FORECAST_API_KEY;
      const forecastResponse = await axios.get<ForecastAPIResponse>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLocation.lat}&lon=${
          selectedLocation.lng
        }&lang=${locale()}&exclude=current,hourly&appid=${api_key}`
      );

      setWeatherData({
        name: forecastResponse.data.city.name,
        date: new Date(forecastResponse.data.list[0].dt_txt),
        sys: { country: forecastResponse.data.city.country },
        main: { temp: forecastResponse.data.list[0].main.temp },
        weather: [
          {
            description: forecastResponse.data.list[0].weather[0].description,
            icon: forecastResponse.data.list[0].weather[0].icon,
          },
        ],
      });

      const filteredForecasts: ForecastDay[] = [];
      let lastDate = '';
      forecastResponse.data.list.forEach((forecast: ForecastDay) => {
        const currentDate = new Date(forecast.dt * 1000).toDateString();
        if (currentDate !== lastDate) {
          filteredForecasts.push(forecast);
          lastDate = currentDate;
        }
      });

      setForecastData({ ...forecastResponse.data, list: filteredForecasts });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [selectedLocation]);

  if (isLoading) {
    return <></>;
  }
  return (
    <div
      className={clsx('c-weather', show ? 'c-weather--show' : '', props.params.styles)}
      id={id ? id : undefined}
      ref={weatherDrawerRef}
    >
      {weatherData && (
        <div
          className="text-body-extra-small-regular hover:text-text-action-secondary-hover active:text-text-action-secondary-press relative flex cursor-pointer items-center gap-1 px-4 py-2 text-text-action-secondary-default"
          onClick={toggleShow}
        >
          <span>
            <Sunny className="h-[22px] w-[22px]" />
          </span>
          <span>{Math.round(weatherData.main.temp - 273.15)}°C</span>
          <span>{weatherData.name}</span>
          <ArrowTip
            className={clsx('h-4 w-4 transition-transform', {
              'rotate-180': show,
            })}
          />
        </div>
      )}
      <div
        className={clsx(
          'absolute right-0 top-full z-30 flex h-[256px] w-fit flex-col justify-between bg-surface-primary p-5 shadow-pressed',
          { hidden: !show }
        )}
      >
        {weatherData && (
          <div className="flex gap-5">
            <Sunny className="h-20 w-20" />
            <div className="flex flex-col">
              <span className="text-body-extra-large-bold text-text-primary">
                {Math.round(weatherData.main.temp - 273.15)}°C
              </span>
              <div className="flex gap-4">
                <span className="text-body-normal-bold text-text-primary">
                  {format(weatherData.date, 'EEEE dd.MM')}
                </span>
                <div className="text-body-normal-bold text-text-primary">
                  <span className="text-body-normal-light text-text-primary">Selected City: </span>
                  {weatherData.name}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex">
          {forecastData &&
            forecastData.list.map((dayForecast, index) => (
              <div
                key={index}
                className="flex w-[113px] flex-col items-center gap-8 border-r border-border-action-tertiary-default px-3"
              >
                <span className="text-body-normal-bold text-text-primary">
                  {format(new Date(dayForecast.dt_txt), 'EEE')}
                </span>
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    type={
                      mapWeatherIcon(
                        dayForecast.weather[0].icon as objectWeatherIconKey,
                        'large'
                      ) as IconType
                    }
                    size={30}
                    className="mt-8"
                  />
                  <span className="text-body-normal-light text-text-secondary">
                    {Math.round(dayForecast.main.temp - 273.15)}°
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
