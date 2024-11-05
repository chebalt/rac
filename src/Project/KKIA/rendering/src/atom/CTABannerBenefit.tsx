import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface CTABannerBenefitFields {
  Icon: ImageField;
  Text: TextField;
}

export type CTABannerBenefitProps = {
  fields: CTABannerBenefitFields;
};

const CTABannerBenefit = (props: CTABannerBenefitProps): JSX.Element => {
  return (
    <div className="flex items-center rtl:flex-row-reverse">
      <div className="rounded-full bg-background mr-2 w-6 h-6 flex items-center justify-center">
        <JssImage field={props.fields.Icon} />
      </div>
      <p className="text-muted-darkest font-light text-base">
        <JssText field={props.fields.Text} />
      </p>
    </div>
  );
};

export default CTABannerBenefit;
