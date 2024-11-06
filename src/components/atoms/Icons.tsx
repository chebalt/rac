import { ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
import React, { AriaAttributes, useMemo } from 'react';

const iconMap = {
  sunCloudy: '/icons/sun-cloudy.png',
  polygonDown: '/icons/polygon.svg',
  cloudyLarge: '/icons/CloudyLarge.svg',
  cloudySmall: '/icons/CloudySmall.svg',
  halfCloudySmall: '/icons/HalfCloudySmall.svg',
  halfCloudyLarge: '/icons/HalfCloudyLarge.svg',
  rainLarge: '/icons/RainLarge.svg',
  rainSmall: '/icons/RainSmall.svg',
  snowLarge: '/icons/SnowLarge.svg',
  snowSmall: '/icons/SnowSmall.svg',
  stormLarge: '/icons/StormLarge.svg',
  stormSmall: '/icons/StormSmall.svg',
  sunnyLarge: '/icons/SunnyLarge.svg',
  sunnySmall: '/icons/SunnySmall.svg',
  windyLarge: '/icons/WindyLarge.svg',
  windySmall: '/icons/WindySmall.svg',
};

export type IconType = keyof typeof iconMap;

export interface IconProps extends AriaAttributes {
  type: IconType;
  quantity?: number;
  size?: number;
  width?: number;
  onClick?: () => void;
  className?: string;
  title?: string;
  alt?: string;
  href?: string;
  id?: string;
}

interface ScIconProps extends Omit<IconProps, 'type'> {
  field: ImageField;
}

export const getIconSrc = (type: IconType): string => iconMap[type];

export const Icon = React.forwardRef<HTMLImageElement, IconProps>(
  ({ type, size, width, className, alt = '', id, quantity, ...rest }, ref) => {
    const _size = size ?? 24;
    const _width = width ?? _size;
    const iconSrc = getIconSrc(type);
    const Container: keyof JSX.IntrinsicElements = rest?.href
      ? 'a'
      : rest?.onClick
      ? 'button'
      : 'span';
    const containerProps = useMemo(() => {
      if (Container === 'button') {
        const buttonProps = { type: 'button' };
        return buttonProps;
      }

      return {};
    }, [Container]);

    if (!iconSrc) {
      return null;
    }

    return (
      <Container
        {...rest}
        {...containerProps}
        className={clsx('leading-none flex-none relative', className)}
      >
        <img
          data-testid={id}
          className="h-full"
          ref={ref}
          src={iconSrc}
          width={_width}
          height={_size}
          alt={alt}
        />
        {typeof quantity === 'number' && quantity > 0 ? (
          <span className="flex justify-center items-center absolute bg-button-cta-yellow w-[24px] h-[24px] rounded-full text-center top-[-15px] right-[-12px] text-sm">
            {quantity}
          </span>
        ) : null}
      </Container>
    );
  }
);
Icon.displayName = 'Icon';

export const ScIcon = React.forwardRef<HTMLImageElement, ScIconProps>(
  ({ field, size, width, className, alt = '', ...rest }, ref) => {
    const _size = size ?? 24;
    const _width = width ?? _size;
    const Container: keyof JSX.IntrinsicElements = rest?.href
      ? 'a'
      : rest?.onClick
      ? 'button'
      : 'span';

    return (
      <Container {...rest} className={clsx('leading-none flex-none', className)}>
        <NextImage
          ref={ref}
          field={field}
          width={_width}
          height={_size}
          unoptimized={true}
          alt={alt}
        />
      </Container>
    );
  }
);

ScIcon.displayName = 'ScIcon';
