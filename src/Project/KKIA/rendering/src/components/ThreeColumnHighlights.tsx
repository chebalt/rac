import React from 'react';
import {
  Text as JssText,
  TextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface ThreeColumnHighlightsFields {
  Title: TextField;
}

interface ThreeColumnHighlightsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: ThreeColumnHighlightsFields;
}

const ThreeColumnHighlights = (props: ThreeColumnHighlightsProps): JSX.Element => {
  const { Title } = props.fields;
  const placeholderKey = `kkia-threecolumnhighlights-cards-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="bg-surface-secondary w-full">
      <SectionPaddingWrapper className="py-14 max-xl:py-10">
        <JssText field={Title} tag="h3" className="font-bold mb-10" />
        <div className="grid xl:grid-cols-3 gap-8">
          <Placeholder name={placeholderKey} rendering={props.rendering} />
        </div>
      </SectionPaddingWrapper>
    </div>
  );
};

export default ThreeColumnHighlights;
