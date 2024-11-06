import React from 'react';
import { Image as JssImage, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

interface Fields {
  Image: ImageField;
  Link: LinkField;
}

type HeaderLogoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HeaderLogoDefaultComponent = (props: HeaderLogoProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Logo</span>
    </div>
  </div>
);

export const Default = (props: HeaderLogoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        <CustomLink field={props.fields.Link}>
          <JssImage field={props.fields.Image} />
        </CustomLink>
      </div>
    );
  }
  return <HeaderLogoDefaultComponent {...props} />;
};
