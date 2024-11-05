import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface CompanyDetailsFields {
  Description: TextField;
  Title: TextField;
  Header: TextField;
  Image: ImageField;
}

interface CompanyDetailsProps {
  rendering: ComponentRendering;
  fields: CompanyDetailsFields;
  params: ComponentParams;
}

const CompanyDetails = (props: CompanyDetailsProps): JSX.Element => {
  const phKey = `kkia-companydetails-cta-${props.params.DynamicPlaceholderId}`;
  const phKeyTags = `kkia-companydetails-tags-${props.params.DynamicPlaceholderId}`;
  const { Description, Title } = props.fields;
  const hasHeader = props.fields.Header.value?.toString() !== '';
  const hasTitle = props.fields.Title.value?.toString() !== '';
  const hasImage = !props.fields.Image.value?.src?.includes('default_image');

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center dir-rtl">
        <div className="flex flex-col gap-4 max-w-[685px]">
          {hasHeader && (
            <JssText
              field={props.fields.Header}
              tag="p"
              className="text-text-secondary text-label-bold"
            />
          )}
          <div className={`flex rtl:flex-row-reverse ${hasImage ? '' : 'gap-4'}`}>
            {hasImage && (
              <div className="hidden md:block max-w-[50px] h-auto">
                <JssImage field={props.fields.Image} />
              </div>
            )}
            {hasTitle && (
              <JssText field={Title} tag="h2" className="text-text-primary text-headline-h2" />
            )}
          </div>
          <JssText
            field={Description}
            tag="p"
            className="text-text-secondary text-body-medium-light"
          />
          <div className="flex flex-wrap gap-3 mt-2">
            <Placeholder name={phKeyTags} rendering={props.rendering} />
          </div>
        </div>
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default CompanyDetails;
