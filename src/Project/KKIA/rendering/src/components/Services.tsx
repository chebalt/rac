import React from 'react';
import {
  Text as JssText,
  Link as JssLink,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ServicesItem, { ServicesItemProps } from 'src/atom/ServicesItem';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

export interface ServicesFields {
  Title: TextField;
  Link: LinkField;
  Services: ServicesItemProps[];
}

export interface ServicesProps {
  fields: ServicesFields;
}

const Services = (props: ServicesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="component Services bg-jade-light py-14 max-xl:py-10">
      <div className="component-content flex flex-col gap-8">
        <div className="flex justify-between flex-wrap max-md:gap-8 rtl:flex-row-reverse">
          <h2 className="font-bold text-[32px] text-jade-darkest">
            <JssText field={props.fields.Title} />
          </h2>
          <p className="font-bold text-lg text-primary-dark-green flex gap-2 justify-center items-center rtl:flex-row-reverse">
            <JssLink field={props.fields.Link} />
            <ArrowIconSvg className="w-6 h-6" />
          </p>
        </div>
        <div className="services-list">
          {props.fields.Services.map((service, index) => (
            <ServicesItem key={index} fields={service.fields} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default Services;
