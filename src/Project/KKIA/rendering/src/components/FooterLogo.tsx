import React from 'react';
import { Image, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

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
    <CustomLink field={fields.Link} className="hover:md:opacity-90 rtl:float-right">
      <Image field={fields.Image} />
    </CustomLink>
  );
};

export default FooterLogo;
