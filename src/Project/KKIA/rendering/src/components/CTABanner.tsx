import React from 'react';
import {
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import Button from 'src/shared-components/Button';
import PrimaryButton from 'src/shared-components/PrimaryButton';

export interface ImageSideFields {
  fields: {
    Name: TextField;
  };
}

export interface CTAButtonFields {
  fields: {
    'Left Icon': ImageField;
    Link: LinkField;
    'Right Icon': ImageField;
  };
}

interface CTABannerProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    Header: TextField;
    Title: TextField;
    Description: TextField;
    'Primary Button'?: CTAButtonFields;
    'Secondary Button'?: CTAButtonFields;
    Image: ImageField;
    'Image Side': ImageSideFields;
  };
}

export const Default = (props: CTABannerProps): JSX.Element => {
  const isImageOnLeftSide =
    props.fields['Image Side'].fields.Name.value?.toString().toLowerCase() === 'left';
  const hasHeader = props.fields.Header.value !== '';
  const primaryButton = props.fields['Primary Button'];
  const secondaryButton = props.fields['Secondary Button'];
  const hasButtons = primaryButton || secondaryButton;

  const phKeyContent = `kkia-pagecontent-cta-content-${props.params.DynamicPlaceholderId}`;

  const sideImage = (
    <div className="relative h-[300px] w-full lg:w-[516px]">
      <NextImage field={props.fields.Image} className="object-cover object-center" fill />
    </div>
  );

  return (
    <SectionPaddingWrapper className="bg-surface-secondary py-10 md:py-14">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-24 rtl:lg:flex-row-reverse">
        {isImageOnLeftSide && sideImage}
        <div className="flex-1 flex flex-col gap-6 rtl:items-end">
          {hasHeader && (
            <div>
              <JssText field={props.fields.Header} />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <JssText
              field={props.fields.Title}
              className="text-headline-h2 text-text-primary"
              tag="h2"
            />
            <JssText
              field={props.fields.Description}
              tag="p"
              className="text-body-medium-regular text-text-secondary"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Placeholder name={phKeyContent} rendering={props.rendering} />
          </div>
          {hasButtons && (
            <div>
              {primaryButton && (
                <Button
                  field={primaryButton.fields.Link}
                  variant="primary"
                  size="default"
                  leftIcon={primaryButton.fields['Left Icon']}
                  rightIcon={primaryButton.fields['Right Icon']}
                />
              )}
              {secondaryButton && (
                <PrimaryButton
                  field={secondaryButton.fields.Link}
                  hasMaxWidth={false}
                  noUnderline
                />
              )}
            </div>
          )}
        </div>
        {!isImageOnLeftSide && sideImage}
      </div>
    </SectionPaddingWrapper>
  );
};

export const CTABannerNarrowWidth = (props: CTABannerProps): JSX.Element => {
  const isImageOnLeftSide =
    props.fields['Image Side'].fields.Name.value?.toString().toLowerCase() === 'left';
  const hasHeader = props.fields.Header.value !== '';
  const primaryButton = props.fields['Primary Button'];
  const secondaryButton = props.fields['Secondary Button'];
  const hasButtons = primaryButton || secondaryButton;

  const phKeyContent = `kkia-pagecontent-cta-content-${props.params.DynamicPlaceholderId}`;

  const sideImage = (
    <div className="relative h-[300px] w-full lg:w-[516px]">
      <NextImage field={props.fields.Image} className="object-cover object-center" fill />
    </div>
  );

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-24 bg-surface-secondary lg:p-14 p-10">
        {isImageOnLeftSide && sideImage}
        <div className="flex-1 flex flex-col gap-6 rtl:items-end">
          {hasHeader && (
            <div>
              <JssText field={props.fields.Header} />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <JssText
              field={props.fields.Title}
              className="text-headline-h2 text-text-primary"
              tag="h2"
            />
            <JssText
              field={props.fields.Description}
              tag="p"
              className="text-body-medium-regular text-text-secondary"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Placeholder name={phKeyContent} rendering={props.rendering} />
          </div>
          {hasButtons && (
            <div>
              {primaryButton && (
                <Button
                  field={primaryButton.fields.Link}
                  variant="primary"
                  size="default"
                  leftIcon={primaryButton.fields['Left Icon']}
                  rightIcon={primaryButton.fields['Right Icon']}
                />
              )}
              {secondaryButton && (
                <PrimaryButton
                  field={secondaryButton.fields.Link}
                  hasMaxWidth={false}
                  noUnderline
                />
              )}
            </div>
          )}
        </div>
        {!isImageOnLeftSide && sideImage}
      </div>
    </SectionPaddingWrapper>
  );
};
