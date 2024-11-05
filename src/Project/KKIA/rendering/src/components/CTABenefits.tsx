import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import CTABannerBenefit, { CTABannerBenefitProps } from 'src/atom/CTABannerBenefit';

interface CTABenefitsProps {
  rendering: ComponentRendering;
  fields: {
    Benefits?: CTABannerBenefitProps[];
  };
}

const CTABenefits = (props: CTABenefitsProps): JSX.Element => {
  return (
    <>
      {props.fields.Benefits?.map((benefit, index) => (
        <CTABannerBenefit key={index} fields={benefit.fields} />
      ))}
    </>
  );
};

export default CTABenefits;
