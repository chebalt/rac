import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface ThreeColumnBenefitFields {
  fields: {
    Icon: ImageField;
    Title: TextField;
    Description: TextField;
  };
}

interface ThreeColumnBenefitsProps {
  rendering: ComponentRendering;
  fields: {
    Benefits: ThreeColumnBenefitFields[];
  };
}

const ThreeColumnBenefits = (props: ThreeColumnBenefitsProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {props.fields.Benefits.map((benefit, index) => (
          <div key={index}>
            <JssImage className="mb-4 rtl:ml-auto" field={benefit.fields.Icon} />
            <JssText tag="h5" className="font-bold mb-2" field={benefit.fields.Title} />
            <JssText tag="h6" className="text-muted-darker" field={benefit.fields.Description} />
          </div>
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export default ThreeColumnBenefits;
