import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

interface ContactUsTileProps {
  rendering: ComponentRendering;
  fields: {
    Text: TextField;
    Link: LinkField;
    Icon: ImageField;
  };
}

const ContactUsTile = (props: ContactUsTileProps): JSX.Element => {
  return (
    <div className="flex flex-row gap-6 flex-grow bg-jade-light p-6 rtl:flex-row-reverse">
      <div className="w-12 h-12 flex items-center justify-center bg-background rounded-full">
        <JssImage field={props.fields.Icon} className="w-full h-full text-primary-dark-green" />
      </div>

      <div className="flex flex-col gap-2">
        <CustomLink
          field={props.fields.Link}
          className="text-muted-darkest font-bold text-xl leading-6"
        />
        <JssText
          field={props.fields.Text}
          tag="p"
          className="text-muted-dark font-normal text-base"
        />
      </div>
    </div>
  );
};

export default ContactUsTile;
