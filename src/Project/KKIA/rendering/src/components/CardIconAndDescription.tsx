import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface CardIconAndDescriptionFields {
  Icon: ImageField;
  Description: TextField;
}

interface CardIconAndDescriptionProps {
  fields: CardIconAndDescriptionFields;
}

const CardIconAndDescription = (props: CardIconAndDescriptionProps): JSX.Element => {
  const { Icon, Description } = props.fields;

  return (
    <div className="flex items-center gap-1">
      <JssImage field={Icon} className="card-icon" />
      <JssText field={Description} tag="h6" className="text-muted-darker font-light" />
    </div>
  );
};

export default CardIconAndDescription;
