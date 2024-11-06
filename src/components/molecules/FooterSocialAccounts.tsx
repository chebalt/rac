import React from 'react';
import {
  Link as JssLink,
  ComponentParams,
  ComponentRendering,
  Field,
  Text,
  ImageField,
  LinkField,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface SocialAccountFields {
  Logo: ImageField;
  Link: LinkField;
}

export type SocialAccountProps = {
  params: { [key: string]: string };
  fields: SocialAccountFields;
  id: string;
};

export interface FooterSocialAccountsFields {
  Title: Field<string>;
  Items: Array<SocialAccountProps>;
}
export type FooterSocialAccountsProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: FooterSocialAccountsFields;
  id: string;
};

export const Default = ({ fields }: FooterSocialAccountsProps) => {
  if (!fields) {
    return null;
  }

  return (
    <div className="text-white uppercase rtl:text-right">
      <span>
        <Text field={fields.Title} />
      </span>
      <div className="flex my-6">
        {fields.Items.map((item) => {
          return (
            <JssLink field={item.fields.Link} key={item.id} className="mr-6 hover:md:opacity-90">
              <Image className="h-[25px] w-[25px]" field={item.fields.Logo} />
            </JssLink>
          );
        })}
      </div>
    </div>
  );
};
