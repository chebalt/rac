import React from 'react';
import {
  TextField,
  Image,
  Link,
  ImageField,
  LinkField,
  Text,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
    <Link field={fields.Link} className="text-white ">
      <div>
        <span className="uppercase">
          <Text field={fields.Text} />
        </span>
        <div className="mt-4 hover:md:opacity-90">
          <Image field={fields.Image} />
        </div>
      </div>
    </Link>
  );
};

export default LogoWithText;
