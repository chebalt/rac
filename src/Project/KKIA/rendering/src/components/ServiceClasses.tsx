import React from 'react';
import { Text as JssText, TextField, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import ServiceClass, { ServiceClassProps } from 'src/atom/ServiceClass';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface ServiceClassesProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    'Service Classes': ServiceClassProps[];
  };
}

const ServiceClasses = (props: ServiceClassesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-8 w-full">
        <div>
          <JssText
            field={props.fields.Title}
            tag="h3"
            className="text-jade-darkest font-bold text-[2rem]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {props.fields['Service Classes']?.map((serviceClass, index) => (
            <ServiceClass key={index} fields={serviceClass.fields} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ServiceClasses;
