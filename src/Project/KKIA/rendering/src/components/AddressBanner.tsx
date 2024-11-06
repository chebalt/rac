import React from 'react';
import {
  ComponentRendering,
  TextField,
  LinkField,
  ImageField,
  Image as JssImage,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';

interface AddressBannerProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Text: TextField;
    Link: LinkField;
    Icon: ImageField;
    'Link Icon': ImageField;
  };
}

const AddressBanner = (props: AddressBannerProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="p-8 bg-background-gray-variant flex flex-col md:flex-row justify-between items-center flex-wrap max-xl:gap-6 rtl:flex-row-reverse">
        <div className="flex items-center gap-4 rtl:flex-row-reverse">
          <div className="bg-background rounded-full min-w-[56px] h-[56px]">
            <JssImage field={props.fields.Icon} />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-darker font-bold mb-1">
              <JssText field={props.fields.Title} />
            </span>
            <p className="text-jade-darkest font-bold">
              <JssText field={props.fields.Text} />
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-auto">
          <Button
            variant="tertiary"
            field={props.fields.Link}
            className="font-normal"
            rightIcon={<ArrowIconSvg />}
            defaultUnderline
          />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default AddressBanner;
