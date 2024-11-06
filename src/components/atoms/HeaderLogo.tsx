import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
        <JssLink field={props.fields.Link}>
          <JssImage field={props.fields.Image} />
        </JssLink>
      </div>
    );
  }
  return <HeaderLogoDefaultComponent {...props} />;
};
