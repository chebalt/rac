import React from 'react';
import {
  ComponentParams,
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

export interface ExploreCardFields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  Link: LinkField;
}

export type ExploreCardProps = {
  params: ComponentParams;
  fields: ExploreCardFields;
};

export const ExploreCard = (props: ExploreCardProps): JSX.Element => {
  return (
    <div className="explore-card">
      <JssImage field={props.fields.Image} />
      <JssText field={props.fields.Title} />
      <JssText field={props.fields.Description} />
      <CustomLink field={props.fields.Link} />
    </div>
  );
};
