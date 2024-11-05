import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface HeroTileProps {
  fields: {
    Icon: ImageField;
    Header: TextField;
    Info: TextField;
  };
}

const HeroTile = (props: HeroTileProps): JSX.Element => {
  return (
    <div className="h-[104px] w-full bg-jade-light p-6 flex items-center mt-6 xl:mt-0">
      <div className="text-primary-dark-green text-2xl mr-6 w-12 h-12 bg-white rounded-full flex-shrink-0  flex items-center justify-center">
        <JssImage field={props.fields.Icon} />
      </div>
      <div>
        <JssText
          field={props.fields.Header}
          tag="h3"
          className="font-normal text-base text-muted-darkest"
        />
        <JssText field={props.fields.Info} tag="h5" className="info font-bold" />
      </div>
    </div>
  );
};

export default HeroTile;
