import React from 'react';
import {
  TextField,
  Image,
  ImageField,
  LinkField,
  Text,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

interface Fields {
  Image: ImageField;
  Link: LinkField;
  Text: TextField;
}

type LogoWithTextProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const LogoWithText = ({ fields }: LogoWithTextProps) => {
  if (!fields) return null;
  return (
    <CustomLink field={fields.Link} className="text-white ">
      <div>
        <span className="uppercase">
          <Text field={fields.Text} />
        </span>
        <div className="mt-4 hover:md:opacity-90">
          <Image field={fields.Image} />
        </div>
      </div>
    </CustomLink>
  );
};

export default LogoWithText;
