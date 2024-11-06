import React from 'react';
import { ComponentRendering, Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

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
      <JssLink className="c-site-link__content" field={props.fields.Link} />
    </div>
  );
};
