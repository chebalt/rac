const objectIconSmall = {
  '01d': 'sunnySmall', //clear-sky
  '02d': 'halfCloudySmall', //few-clouds
  '03d': 'cloudySmall', //scattered-clouds
  '04d': 'cloudySmall', //broken clouds
  '09d': 'rainSmall', //shower-rain
  '10d': 'rainSmall', //rain
  '11d': 'stormSmall', //thunderstorm
  '13d': 'snowSmall', //snow
  '50d': 'windySmall', //wind
  '01n': 'sunnySmall', //clear-sky
  '02n': 'halfCloudySmall', //few-clouds
  '03n': 'cloudySmall', //scattered-clouds
  '04n': 'cloudySmall', //broken clouds
  '09n': 'rainSmall', //shower-rain
  '10n': 'rainSmall', //rain
  '11n': 'stormSmall', //thunderstorm
  '13n': 'snowSmall', //snow
  '50n': 'windySmall', //wind
};
const objectIconLarge = {
  '01d': 'sunnyLarge', //clear-sky
  '02d': 'halfCloudyLarge', //few-clouds
  '03d': 'cloudyLarge', //scattered-clouds
  '04d': 'cloudyLarge', //broken clouds
  '09d': 'rainLarge', //shower-rain
  '10d': 'rainLarge', //rain
  '11d': 'stormLarge', //thunderstorm
  '13d': 'snowLarge', //snow
  '50d': 'windyLarge', //wind
  '01n': 'sunnyLarge', //clear-sky
  '02n': 'halfCloudyLarge', //few-clouds
  '03n': 'cloudyLarge', //scattered-clouds
  '04n': 'cloudyLarge', //broken clouds
  '09n': 'rainLarge', //shower-rain
  '10n': 'rainLarge', //rain
  '11n': 'stormLarge', //thunderstorm
  '13n': 'snowLarge', //snow
  '50n': 'windyLarge', //wind
};

export type objectWeatherIconKey = keyof typeof objectIconSmall;

export const mapWeatherIcon = (code: objectWeatherIconKey, size: 'small' | 'large') => {
  return size === 'large' ? objectIconLarge[code] : objectIconSmall[code];
};
