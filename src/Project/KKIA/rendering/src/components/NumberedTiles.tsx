import React from 'react';
import {
  RichText as JssRichText,
  Text as JssText,
  LinkField,
  TextField,
  ComponentRendering,
  RichTextField,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import CustomLink from 'src/shared-components/CustomLink';

interface NumberedTilesProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    Title: TextField;
    Description: RichTextField;
    Link: LinkField;
  };
}

const NumberedTiles = (props: NumberedTilesProps): JSX.Element => {
  const phKey = `kkia-pagecontent-numberedtile-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-10 md:pb-14 md:pt-8">
      <div className="flex flex-col gap-6">
        <JssText
          field={props.fields.Title}
          tag="h2"
          className="text-headline-h2 text-text-primary"
        />

        <JssRichText field={props.fields.Description} />

        <div className="flex flex-col md:flex-row gap-6 items-center rtl:flex-row-reverse">
          <Placeholder name={phKey} rendering={props.rendering} />
          <CustomLink
            field={props.fields.Link}
            className="text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press text-body-medium-bold flex-shrink-0"
          />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default NumberedTiles;
