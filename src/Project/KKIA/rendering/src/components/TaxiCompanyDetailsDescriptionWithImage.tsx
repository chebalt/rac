import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface TaxiCompanyDetailsDescriptionWithImageFields {
  Title: TextField;
  Description: TextField;
  Image: ImageField;
  'Mobile Image': ImageField;
}

interface TaxiCompanyDetailsDescriptionWithImageProps {
  rendering: ComponentRendering;
  fields: TaxiCompanyDetailsDescriptionWithImageFields;
}

const TaxiCompanyDetailsDescriptionWithImage = (
  props: TaxiCompanyDetailsDescriptionWithImageProps
): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col gap-6 mb-10">
        <JssText field={props.fields.Title} tag="h2" className="font-bold md:text-[2rem]" />
        <JssText
          field={props.fields.Description}
          tag="p"
          className="text-muted-darker font-light"
        />
      </div>
      <JssImage className="w-full h-full object-cover max-xl:hidden" field={props.fields.Image} />
      <JssImage
        className="w-full max-h-[500px] object-contain xl:hidden"
        field={props.fields['Mobile Image']}
      />
    </div>
  );
};

export default TaxiCompanyDetailsDescriptionWithImage;
