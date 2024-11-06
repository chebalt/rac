import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Text as JssText,
  LinkField,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import StarIconSvg from 'assets/icons/StarIconSvg';
import ImageCTARewardsCarousel from './ui/image-cta-rewards/ImageCTARewardsCarousel';
import ImageCTARewardsWithArrowsCarousel from 'components/ui/image-cta-rewards/ImageCTARewardsWithArrowsCarousel';
import ArrowGroup from '../shared-components/ArrowGroup';
import CustomLink from 'src/shared-components/CustomLink';

interface ImageCTARewardsFields {
  Title: TextField;
  Description: TextField;
  Text: TextField;
  Button: LinkField;
  Images: Array<{
    fields: {
      Image: ImageField;
    };
  }>;
}

type ImageCTARewardsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ImageCTARewardsFields;
};

export const Default = (props: ImageCTARewardsProps): JSX.Element => {
  const images = props.fields?.Images || [];
  return (
    <SectionPaddingWrapper>
      <div className="c-image-cta-slider">
        <div className="flex flex-row gap-[6rem] max-xl:gap-[1.5rem] max-xl:flex-wrap rtl:flex-row-reverse">
          <div className="w-full xl:w-1/2">
            <ImageCTARewardsCarousel images={images} />
          </div>
          <div className="flex flex-col gap-[1.5rem] rtl:items-end">
            <div className="flex flex-col gap-[1rem] rtl:items-end">
              <div className="flex gap-[0.5rem] items-center rtl:justify-end">
                <StarIconSvg />
                <h2 className="text-[0.875rem] text-muted-darker">
                  <JssText field={props.fields.Title} />
                </h2>
              </div>
              <p className="text-[2rem] text-muted-darkest font-bold">
                <JssText field={props.fields.Description} />
              </p>
              <p className="text-[1.125rem] text-muted-dark">
                <JssText field={props.fields.Text} />
              </p>
            </div>
            <CustomLink className="c-image-cta-slider--btn" field={props.fields.Button} />
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const ImageCTARewardsWithArrows = (props: ImageCTARewardsProps): JSX.Element => {
  const images = props.fields?.Images || [];
  return (
    <SectionPaddingWrapper>
      <div className="c-image-cta-slider">
        <div className="flex flex-row gap-[6rem] max-xl:gap-[1.5rem] max-xl:flex-wrap">
          <div className="w-full xl:w-1/2">
            <ImageCTARewardsWithArrowsCarousel images={images} />
          </div>
          <div className="flex flex-col gap-[1.5rem] rtl:items-end">
            <div className="flex flex-col gap-6">
              <div className="flex gap-[0.5rem] items-center">
                <h2 className="text-[0.875rem] text-muted-darker">
                  <JssText field={props.fields.Title} />
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[2rem] text-headline-h2 text-text-primary font-bold">
                  <JssText field={props.fields.Description} />
                </p>
                <p className="text-[1.125rem] text-body-medium-light text-text-secondary">
                  <JssText field={props.fields.Text} />
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <CustomLink className="c-image-cta-slider--btn" field={props.fields.Button} />
              <div className="lg:w-fit">
                <ArrowGroup
                  nextBtnClassName="rewards-cta-w-arrows-slider-next"
                  prevBtnClassName="rewards-cta-w-arrows-slider-prev"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const VerticalImageCTARewardsWithArrows = (props: ImageCTARewardsProps): JSX.Element => {
  const images = props.fields?.Images || [];
  return (
    <SectionPaddingWrapper>
      <div className="c-image-cta-slider">
        <div className="flex flex-row gap-[6rem] max-xl:gap-[1.5rem] max-xl:flex-wrap">
          <div className="w-full xl:w-1/2">
            <ImageCTARewardsCarousel images={images} />
          </div>
          <div className="flex flex-col gap-[1.5rem] rtl:items-end">
            <div className="flex flex-col gap-[1rem] rtl:items-end">
              <div className="flex gap-[0.5rem] items-center">
                <h2 className="text-label-bold text-muted-darker">
                  <JssText field={props.fields.Title} />
                </h2>
              </div>
              <p className="text-[2rem] text-muted-darkest font-bold">
                <JssText field={props.fields.Description} />
              </p>
              <p className="text-[1.125rem] text-muted-dark">
                <JssText field={props.fields.Text} />
              </p>
            </div>
            <CustomLink className="c-image-cta-slider--btn" field={props.fields.Button} />
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const HorizontalShopVariant = (props: ImageCTARewardsProps): JSX.Element => {
  const images = props.fields?.Images || [];
  return (
    <SectionPaddingWrapper>
      <div className="c-image-cta-slider">
        <div className="flex flex-row gap-[6rem] max-xl:gap-[1.5rem] max-xl:flex-wrap">
          <div className="w-full xl:w-1/2">
            <ImageCTARewardsCarousel images={images} />
          </div>
          <div className="flex flex-col gap-[1.5rem] rtl:items-end">
            <div className="flex flex-col gap-[1rem] rtl:items-end">
              <div className="flex gap-[0.5rem] items-center">
                <h2 className="text-label-bold text-muted-darker">
                  <JssText field={props.fields.Title} />
                </h2>
              </div>
              <p className="text-[2rem] text-muted-darkest font-bold">
                <JssText field={props.fields.Description} />
              </p>
              <p className="text-[1.125rem] text-muted-dark">
                <JssText field={props.fields.Text} />
              </p>
            </div>
            <CustomLink className="c-image-cta-slider--btn" field={props.fields.Button} />
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};
