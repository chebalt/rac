import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Text as JssText,
  Placeholder,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
interface ContactUsTilesProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    Header: TextField;
    Title: TextField;
    Description: TextField;
  };
}

const ContactUsTiles = (props: ContactUsTilesProps): JSX.Element => {
  const phKeyRow = `kkia-pagecontent-contact-row-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <JssText
              field={props.fields.Header}
              tag="p"
              className="text-muted-darker text-xs font-normal tracking-[10%]"
            />

            <JssText
              field={props.fields.Title}
              tag="h2"
              className="text-jade-darkest font-bold text-[2rem] leading-[3rem]"
            />
          </div>

          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-muted-darker font-light text-lg leading-[2rem]"
          />
        </div>
        <div className="flex flex-col gap-8">
          <Placeholder name={phKeyRow} rendering={props.rendering} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ContactUsTiles;
