import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  LinkField,
  ImageField,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';

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
    <div>
      <JssImage field={Image} className="max-h-[180px] h-full w-full object-cover" />
      <div className="flex flex-col gap-5 p-6 bg-[#FFFFFF]">
        <JssText field={Title} tag="h5" className="font-bold" />
        <JssText field={Description} tag="h6" className="text-muted-darker font-light" />
        <Placeholder name={placeholderKey} rendering={props.rendering} />
        <div>
          <Button
            variant="tertiary"
            field={Link}
            rightIcon={<ArrowIconSvg />}
            className="text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnHighlightsCard;
