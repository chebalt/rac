import React from 'react';
import { ComponentRendering, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

interface SiteLinkItemFields {
  Link: LinkField;
}

type SiteLinkProps = {
  rendering: ComponentRendering;
  fields: SiteLinkItemFields;
};

export const Default = (props: SiteLinkProps): JSX.Element => {
  return (
    <div className="c-site-link">
      <CustomLink className="c-site-link__content" field={props.fields.Link}></CustomLink>
    </div>
  );
};
