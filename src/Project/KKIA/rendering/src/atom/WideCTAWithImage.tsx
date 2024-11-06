import React from 'react';
import {
  Text,
  ImageField,
  LinkField,
  TextField,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';

export interface WideCTAWithImageFields {
  Title: TextField;
  Description: TextField;
  Link: LinkField;
  'Link Icon': ImageField;
  Image: ImageField;
}

export interface WideCTAWithImageProps {
  fields: WideCTAWithImageFields;
}

const WideCTAWithImage = (props: WideCTAWithImageProps): JSX.Element => {
  return (
    <div className="flex gap-8 p-8 bg-jade-light max-xl:flex-col">
      <div>
        <JssImage
          className="h-[168px] min-w-[168px] max-w-[168px] max-xl:max-w-full object-cover w-full"
          field={props.fields.Image}
        />
      </div>
      <div className="flex flex-col justify-between ">
        <div className="flex justify-center items-baseline flex-col gap-2 mb-4 rtl:items-end">
          <h4 className="text-2xl font-bold text-jade-darkest">
            <Text field={props.fields.Title} />
          </h4>
          <h6 className="font-light text-muted-darker">
            <Text field={props.fields.Description} />
          </h6>
        </div>
        <div className="rtl:w-auto rtl:ml-auto">
          <Button
            variant="tertiary"
            field={props.fields.Link}
            className="font-normal"
            rightIcon={<ArrowIconSvg />}
            defaultUnderline
          />
        </div>
      </div>
    </div>
  );
};

export default WideCTAWithImage;
