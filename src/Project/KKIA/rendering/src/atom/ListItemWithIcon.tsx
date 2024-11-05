import React from 'react';
import {
  Link as JssLink,
  LinkField,
  Image as JssImage,
  ImageField,
  TextField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ListItemWithIconFields {
  Text: TextField;
  Icon: ImageField;
}

export type ListItemWithIconProps = {
  fields: ListItemWithIconFields;
};

const ListItemWithIcon = (props: ListItemWithIconProps): JSX.Element => {
  return (
    <div className="flex items-center gap-5">
      <div className="w-[48px] h-[48px] bg-jade-light rounded-full">
        <JssImage className="w-full h-full" field={props.fields.Icon} />
      </div>
      <JssText tag="p" className="font-light text-muted-darker" field={props.fields.Text} />
    </div>
  );
};

export default ListItemWithIcon;
