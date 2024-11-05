import React, { useState } from 'react';
import {
  ComponentParams,
  Image as JssImage,
  ImageField,
  LinkField,
  TextField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
import Button from 'src/shared-components/Button';

export interface WhatShouldIKnowItemFields {
  Image: ImageField;
  Title: TextField;
  Link: LinkField;
}

export type WhatShouldIKnowItemProps = {
  params: ComponentParams;
  fields: WhatShouldIKnowItemFields;
};

export const Default = (props: WhatShouldIKnowItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative w-full lg:w-[23%] h-[300px] mb-8 lg:mb-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 right-0 top-0 bottom-[20%]">
        <JssImage field={props.fields.Image} className="w-full h-full object-cover" />
      </div>
      <div className="z-30 absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-end">
        <div
          className={clsx(
            'p-6 bg-white flex-1 transition-all duration-300 ease-in-out max-h-[30%]',
            {
              'lg:max-h-[50%]': isHovered,
            }
          )}
        >
          <JssText
            field={props.fields.Title}
            tag="h3"
            className="text-body-large-bold text-text-primary mb-5"
          />
          <div
            className={clsx(`transition-opacity duration-300 ease-in-out lg:opacity-0`, {
              'lg:opacity-100': isHovered,
            })}
          >
            {props.fields.Link.value.href && (
              <Button field={props.fields.Link} variant="tertiary" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
