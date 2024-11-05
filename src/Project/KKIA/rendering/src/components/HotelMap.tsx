import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  TextField,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PrimaryButton from '../shared-components/PrimaryButton';

interface HotelMapFields {
  Heading: TextField;
  Title: TextField;
  Text: TextField;
  Link: LinkField;
  Image: ImageField;
}

interface HotelMapProps {
  fields: HotelMapFields;
}

const HotelMap = (props: HotelMapProps): JSX.Element => {
  return (
    <div className="pt-10 md:pt-14 xl:ml-custom overflow-x-hidden relative max-lg:w-[90%] max-lg:mx-auto w-full">
      <div className="bg-background-dark flex max-lg:flex-col items-center gap-24 w-full max-lg:gap-10">
        <div className="flex flex-col lg:p-14 p-10 gap-12">
          <JssText tag="h3" className="font-bold text-[2rem]" field={props.fields.Heading} />
          <div className="flex flex-col gap-2">
            <JssText tag="p" className="font-bold text-muted-darker" field={props.fields.Title} />
            <JssText tag="p" className="text-sm" field={props.fields.Text} />
          </div>
          <div>
            <PrimaryButton hasMaxWidth={false} fontSize="1.125rem" field={props.fields.Link} />
          </div>
        </div>
        <JssImage className="max-h-[467px] h-full w-full object-cover" field={props.fields.Image} />
      </div>
    </div>
  );
};

export default HotelMap;
