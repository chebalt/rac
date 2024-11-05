import React from 'react';
import {
  TextField,
  Text as JssText,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface AccordionFields {
  Title: TextField;
  Description: TextField;
}

interface AccordionProps {
  rendering: ComponentRendering;
  fields: AccordionFields;
  params: ComponentParams;
}

const Accordion = (props: AccordionProps): JSX.Element => {
  const phKey = `kkia-pagecontent-accordion-${props.params.DynamicPlaceholderId}`;
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
            className="text-body-large-regular text-text-secondary"
          />
        </div>
        <div className="accordion-content">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default Accordion;
