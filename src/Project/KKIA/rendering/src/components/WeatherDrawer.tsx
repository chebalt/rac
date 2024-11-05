/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CityFields } from 'src/atom/Cities';
import axios from 'axios';
import { useI18n } from 'next-localization';
import { cn } from 'lib/cn';
import { Icon, IconType } from './ui/Icons';
import { Typography } from './ui/typography';
import { ForecastAPIResponse } from 'src/types/forecast.type';
import dayjs, { Dayjs } from 'dayjs';
import { mapWeatherIcon, objectWeatherIconKey } from 'lib/weather-icon';

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
  date: Dayjs;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const weatherDrawerRef = useRef<HTMLDivElement>(null);

  const { renderingContext } = props;
  const { isMobileMenuOpen = false, toggleMobileMenu } = renderingContext;

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
        date: dayjs(forecastResponse.data.list[0].dt_txt),
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (weatherDrawerRef.current && !weatherDrawerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <></>;
  }
  return (
    <div
      className={cn('c-weather', show ? 'c-weather--show' : '', props.params.styles)}
      id={id ? id : undefined}
      ref={weatherDrawerRef}
    >
      {weatherData && (
        <div className="flex items-center gap-2" onClick={toggleShow}>
          <div className="flex items-center gap-2">
            <Icon
              type={
                mapWeatherIcon(
                  weatherData.weather[0].icon as objectWeatherIconKey,
                  'small'
                ) as IconType
              }
              size={24}
            />
            <Typography variant="utility" className="text-primary-dark-green">
              {Math.round(weatherData.main.temp - 273.15)}°C
            </Typography>
            <Typography variant="utility" className="text-primary-dark-green">
              {weatherData.name}
            </Typography>
          </div>
          {!isMobileMenuOpen ? (
            <Icon
              type="polygonDown"
              size={8}
              className={cn(show ? 'rotate-180' : 'rotate-0', 'ml-2')}
            />
          ) : (
            <button>
              <img src="/icons/chevron-right.svg" alt="arrow right" />
            </button>
          )}
        </div>
      )}
      <div
        className={`c-weather__menu ${show ? 'c-weather__menu--open' : 'c-weather__menu--close'}`}
      >
        {show && isMobileMenuOpen && (
          <>
            <div className="c-weather__menu-header bg-background">
              <div className="relative p-[1rem] border-b-2 border-muted-variant w-full flex justify-between items-center">
                <button onClick={toggleShow} className="c-weather__back-button">
                  <img src="/icons/chevron-left.svg" alt="back to main menu" />
                </button>
                <h6 className="font-bold text-center text-jade-darkest">Weather</h6>
                <button onClick={toggleMobileMenu}>
                  <img src="/icons/close.svg" alt="close menu" />
                </button>
              </div>
            </div>
            <div className="grid bg-background shadow-muted-dark">
              {weatherData && (
                <div className="flex items-center flex-col gap-5 px-[1rem] h-full">
                  <div
                    className="relative w-full h-full max-md:border-b max-md:border-muted-primary"
                    ref={dropdownRef}
                  >
                    <button
                      className="w-full lg:h-full px-4 bg-jade-light outline-none border-none rounded-none focus:bg-background flex items-center justify-between gap-1 max-md:bg-white"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className="max-md:text-[1rem] max-md:text-primary-dark-green max-md:font-bold max-md:py-4">
                        {weatherData.name}
                      </span>
                      <Icon
                        type="polygonDown"
                        size={8}
                        className={`transform transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isDropdownOpen && (
                      <ul
                        className="absolute left-0 min-w-full bg-white z-[10000] max-md:h-[35vh] max-md:overflow-scroll"
                        role="listbox"
                      >
                        {props.fields.Cities.map((city, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                setSelectedLocation({
                                  lat: city.fields.Latitude.value,
                                  lng: city.fields.Longitude.value,
                                });
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              {city.fields.City.value}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex max-md:py-4 max-md:gap-5">
                    <Icon
                      type={
                        mapWeatherIcon(
                          weatherData.weather[0].icon as objectWeatherIconKey,
                          'large'
                        ) as IconType
                      }
                      size={80}
                    />
                    <div className="grid grid-cols-1 grid-rows-3">
                      <Typography
                        variant="xl"
                        className="row-start-1 row-end-3 text-start rtl:text-end"
                      >
                        {Math.round(weatherData.main.temp - 273.15)}°C
                      </Typography>
                      <div className="row-start-3 row-end-4 col-start-1 col-end-3 flex gap-4 items-center">
                        <Typography className="font-semibold">
                          {weatherData.date.format('dddd')} {weatherData.date.format('DD.MM')}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-7 last:border-none w-full p-[1rem]">
                {forecastData &&
                  forecastData.list.map((dayForecast) => (
                    <div
                      key={dayForecast.dt_txt}
                      className="border-r border-border-light/15 flex flex-col items-center"
                    >
                      <Typography className="font-semibold max-md:text-center">
                        {dayjs(dayForecast.dt_txt).format('ddd')}
                      </Typography>
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
                      <Typography className="font-light max-md:text-center">
                        {Math.round(dayForecast.main.temp - 273.15)}°
                      </Typography>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
      {show && !isMobileMenuOpen && (
        <div className="c-weather__content">
          {weatherData && (
            <div className="flex items-center gap-5 h-20 w-full rtl:flex-row-reverse">
              <Icon
                type={
                  mapWeatherIcon(
                    weatherData.weather[0].icon as objectWeatherIconKey,
                    'large'
                  ) as IconType
                }
                size={80}
              />
              <div className="flex flex-col w-full">
                <Typography variant="xl" className="row-start-1 row-end-3 text-start">
                  {Math.round(weatherData.main.temp - 273.15)}°C
                </Typography>
                <div className="flex w-full items-center gap-4 rtl:flex-row-reverse">
                  <Typography className="font-semibold ">
                    {weatherData.date.format('dddd')} {weatherData.date.format('DD.MM')}
                  </Typography>
                  <div className="relative h-full" ref={dropdownRef}>
                    <button
                      className="w-full lg:h-full px-4 outline-none border-none rounded-none focus:bg-background flex items-center gap-1"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className="text-primary-dark-green font-bold text-base">
                        {weatherData.name}
                      </span>
                      <Icon
                        type="polygonDown"
                        size={8}
                        className={`transform transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isDropdownOpen && (
                      <ul
                        className="absolute left-0 min-w-full bg-white z-[10000] max-h-60 overflow-y-auto"
                        role="listbox"
                      >
                        {props.fields.Cities.map((city, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                setSelectedLocation({
                                  lat: city.fields.Latitude.value,
                                  lng: city.fields.Longitude.value,
                                });
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              {city.fields.City.value}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-7 last:border-none w-full dir-rtl">
            {forecastData &&
              forecastData.list.map((dayForecast) => (
                <div
                  key={dayForecast.dt_txt}
                  className="border-r border-border-light/15 flex flex-col items-center"
                >
                  <Typography className="font-semibold">
                    {dayjs(dayForecast.dt_txt).format('ddd')}
                  </Typography>
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
                  <Typography className="font-light">
                    {Math.round(dayForecast.main.temp - 273.15)}°
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
