import React from 'react';
import { Image, Link, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

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
    <Link field={fields.Link} className="hover:md:opacity-90 rtl:float-right">
      <Image field={fields.Image} />
    </Link>
  );
};

export default FooterLogo;
