import React from 'react';
import { Image as JssImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

interface HeroIconProps {
  fields: {
    Icon: ImageField;
  };
}

const HeroIcon = (props: HeroIconProps): JSX.Element => {
  return <JssImage field={props.fields.Icon} />;
};

export default HeroIcon;
