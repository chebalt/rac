import React from 'react';
import {
  Text as JssText,
  TextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import { Text18, Text32 } from 'src/shared-components/Texts';

interface ServicesClassesCardsFields {
  Title: TextField;
  Description: TextField;
}

interface ServicesClassesCardsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: ServicesClassesCardsFields;
}

const ServicesClassesCards = (props: ServicesClassesCardsProps): JSX.Element => {
  const { Title, Description } = props.fields;
  const placeholderKey = `kkia-pagecontent-serviceclassescards-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-14 bg-jade-light">
      <Text32 field={Title} hasMarginBottom />
      <Text18 field={Description} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <Placeholder name={placeholderKey} rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ServicesClassesCards;
