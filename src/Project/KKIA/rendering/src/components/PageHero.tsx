import React from 'react';
import {
  Text,
  Field,
  Image as JssImage,
  ComponentRendering,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

type FeatureItem = {
  fields: {
    Icon: ImageField;
    Name: Field<string>;
  };
};
interface PageHeroProps {
  rendering: ComponentRendering;
  fields: {
    Heading: Field<string>;
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    Features: FeatureItem[];
  };
}

const PageHero = (props: PageHeroProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="lg:flex lg:flex-row lg:justify-between gap-24 rtl:lg:flex-row-reverse">
        <div className="lg:flex flex-col w-full rtl:items-end">
          <Text
            field={props.fields.Heading}
            tag="p"
            className="text-body-small-regular text-text-secondary mb-4"
          />
          <Text
            field={props.fields.Title}
            tag="h1"
            className="text-headline-h1-2 text-text-primary mb-6"
          />

          {props.fields.Description.value !== '' && (
            <div className="font-normal text-lg text-muted-darker mb-4 dir-rtl">
              <Text field={props.fields.Description} />
            </div>
          )}
          <div className="flex flex-wrap gap-3 mb-10 rtl:justify-end">
            {props.fields.Features.map((item, indx) => (
              <div
                key={indx}
                className="bg-surface-secondary text-text-action-secondary-default flex gap-1 py-1 px-3 items-center"
              >
                <JssImage
                  className="w-[20px] h-[20px] text-icon-primary"
                  field={item?.fields?.Icon}
                />
                <Text
                  className=" text-nowrap text-body-medium-regular"
                  tag="p"
                  field={item?.fields?.Name}
                />
              </div>
            ))}
          </div>
        </div>
        <JssImage className="w-full max-h-[340px] object-cover" field={props.fields.Image} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default PageHero;
