import React from 'react';
import { Link as JssLink, Image, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
  Link: LinkField;
}

type FooterLogoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FooterLogo = ({ fields }: FooterLogoProps) => {
  if (!fields) return null;

  return (
    <JssLink field={fields.Link} className="hover:md:opacity-90 rtl:float-right">
      <Image field={fields.Image} />
    </JssLink>
  );
};

export default FooterLogo;
