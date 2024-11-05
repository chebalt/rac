import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface CTATitleWithIconAndDescriptionProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Icon: ImageField;
  };
}

const CTATitleWithIconAndDescription = (
  props: CTATitleWithIconAndDescriptionProps
): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <JssImage field={props.fields.Icon} />

        <JssText
          field={props.fields.Title}
          tag="h3"
          className="text-body-large-bold text-text-primary"
        />
      </div>

      <JssText
        field={props.fields.Description}
        tag="p"
        className="text-body-normal-regular text-text-secondary"
      />
    </div>
  );
};

export default CTATitleWithIconAndDescription;
