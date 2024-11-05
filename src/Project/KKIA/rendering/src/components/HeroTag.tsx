import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface HeroTagProps {
  fields: {
    'Icon Left'?: ImageField;
    Name: TextField;
    'Icon Right'?: ImageField;
  };
}

const HeroTag = (props: HeroTagProps): JSX.Element => {
  return (
    <div className="uppercase px-3 py-1 text-primary-dark-green bg-jade-light w-fit text-[1.125rem] flex gap-2 items-center">
      <JssImage field={props.fields['Icon Left']} className="w-[20px] h-[20px] object-cover" />
      <JssText field={props.fields.Name} className="name" />
      <JssImage field={props.fields['Icon Right']} className="w-[20px] h-[20px] object-cover" />
    </div>
  );
};

export default HeroTag;
