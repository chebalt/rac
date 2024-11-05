import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface CompanyDetailsTagProps {
  fields: {
    Icon: ImageField;
    Title: TextField;
  };
}

const CompanyDetailsTag = (props: CompanyDetailsTagProps): JSX.Element => {
  return (
    <div className="bg-jade-light text-primary-dark-green flex gap-1 py-1 px-3 items-center">
      <JssImage className="w-[20px] h-[20px] bg-jade-light" field={props.fields.Icon} />
      <JssText className="text-primary-dark-green text-nowrap" tag="p" field={props.fields.Title} />
    </div>
  );
};

export default CompanyDetailsTag;
