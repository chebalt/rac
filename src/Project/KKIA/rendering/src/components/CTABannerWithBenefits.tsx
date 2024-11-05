import React from 'react';
import {
  Text,
  Field,
  ComponentRendering,
  ImageField,
  LinkField,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CTABannerBenefit, { CTABannerBenefitProps } from 'src/atom/CTABannerBenefit';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface CTABannerWithBenefitsProps {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Benefits?: CTABannerBenefitProps[];
    Link: LinkField;
    'Link Icon': ImageField;
    Image: ImageField;
  };
}

const CTABannerWithBenefits = (props: CTABannerWithBenefitsProps): JSX.Element => {
  const linkUrl = props.fields.Link.value.href;
  const linkText = props.fields.Link.value.text;

  return (
    <SectionPaddingWrapper className="bg-jade-light py-10 md:py-14 ">
      <div className="flex flex-col md:flex-row gap-8 md:gap-24">
        <div>
          <JssImage field={props.fields.Image} />
        </div>
        <div className="flex flex-col gap-4 justify-center ">
          <h3 className="font-bold text-[2rem] text-jade-darkest">
            <Text field={props.fields.Title} />
          </h3>
          <div className="flex flex-col gap-6">
            <p className="font-normal text-lg text-muted-darker">
              <Text field={props.fields.Description} />
            </p>
            <div className="flex flex-col gap-4">
              {props.fields.Benefits?.map((benefit, index) => (
                <CTABannerBenefit key={index} fields={benefit.fields} />
              ))}
            </div>
            <a
              href={linkUrl}
              className="px-6 py-4 text-jade-darker bg-primary-variant font-bold text-lg w-full md:w-fit text-center flex gap-2 flex-nowrap justify-center items-center"
            >
              {linkText}
              {props.fields['Link Icon'].value !== undefined && (
                <div>
                  <JssImage field={props.fields['Link Icon']} />
                </div>
              )}
            </a>
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default CTABannerWithBenefits;
