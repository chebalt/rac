import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  TextField,
  LinkField,
  ImageField,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PrimaryButton from '../shared-components/PrimaryButton';

interface ThreeColumnHighlightsCardFields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  Link: LinkField;
}

interface ThreeColumnHighlightsCardProps {
  fields: ThreeColumnHighlightsCardFields;
  rendering: ComponentRendering;
  params: ComponentParams;
}

const ThreeColumnHighlightsCard = (props: ThreeColumnHighlightsCardProps): JSX.Element => {
  const { Image, Title, Description, Link } = props.fields;
  const placeholderKey = `kkia-threecolumnhighlights-cards-tiles-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="three-column-highlights-card">
      <JssImage field={Image} className="max-h-[180px] h-full w-full object-cover" />
      <div className="flex flex-col gap-5 p-6 bg-white">
        <JssText field={Title} tag="h5" className="font-bold" />
        <JssText field={Description} tag="h6" className="text-muted-darker font-light" />
        <Placeholder name={placeholderKey} rendering={props.rendering} />
        <div>
          <PrimaryButton fontSize="1.125rem" noUnderline field={Link} hasMaxWidth={false} />
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnHighlightsCard;
