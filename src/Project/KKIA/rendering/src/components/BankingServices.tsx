import React from 'react';
import {
  Text as JssText,
  Placeholder,
  TextField,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface BankingServicesFields {
  Title: TextField;
  Description: TextField;
}

interface BankingServicesProps {
  rendering: ComponentRendering;
  fields: BankingServicesFields;
  params: ComponentParams;
}

const BankingServices = (props: BankingServicesProps): JSX.Element => {
  const phKey = `kkia-pagecontent-bankingservices-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <JssText
            field={props.fields.Title}
            tag="h2"
            className="text-headline-h2 text-text-primary"
          />

          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-text-secondary text-body-medium-light"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default BankingServices;
