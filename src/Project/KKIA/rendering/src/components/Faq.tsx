import React from 'react';
import {
  ComponentParams,
  Text as JssText,
  TextField,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface FaqFields {
  Title: TextField;
  Header: TextField;
}

interface FaqProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: FaqFields;
}

const Faq = (props: FaqProps): JSX.Element => {
  const hasHeader = props.fields.Header?.value?.toString() !== '';
  const phKey = `kkia-pagecontent-faq-question-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-14">
      <div className="flex flex-col rtl:lg:flex-row-reverse">
        {hasHeader && (
          <div>
            <JssText field={props.fields.Header} />
          </div>
        )}
        <div className="w-full font-bold text-[2rem] text-jade-darkest mb-14 rtl:text-right">
          <JssText field={props.fields.Title} />
        </div>
        <div className="w-full">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default Faq;
