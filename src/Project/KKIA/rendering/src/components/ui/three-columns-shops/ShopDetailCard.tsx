import React from 'react';
import {
  TextField,
  ImageField,
  LinkField,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { useI18n } from 'next-localization';
import CustomCard from 'src/shared-components/CustomCard';

export interface AreaOfLocationFields {
  fields: {
    'Location Name': TextField;
  };
}

export interface TerminalFields {
  id: string;
  fields: {
    Location: LinkField;
    Area: AreaOfLocationFields;
    Name: TextField;
  };
}

export interface CategoryFields {
  fields: {
    Name: TextField;
  };
}

export interface ShopPageFields {
  Image: ImageField;
  Name: TextField;
  Description: TextField;
  Category: CategoryFields;
  Terminals: Array<TerminalFields>;
  'Open Time': TextField;
  'Phone Number': TextField;
  Website: LinkField;
  'Menu Link'?: LinkField;
}

export type ShopDetailCardProps = {
  params: ComponentParams;
  fields: ShopPageFields;
  itemUrl: string;
};

const ShopDetailCard = ({ fields, itemUrl }: ShopDetailCardProps): JSX.Element => {
  const { t } = useI18n();

  return (
    <CustomCard
      title={fields.Name}
      category={fields.Category?.fields?.Name}
      description={fields.Description}
      image={fields.Image}
      openTime={fields['Open Time']}
      phoneNumber={fields['Phone Number']}
      website={fields.Website}
      menulink={fields['Menu Link']}
      terminals={fields.Terminals}
      btnText={t('threecolumnshops-viewDetails')}
      btnUrl={itemUrl}
    />
  );
};

export default ShopDetailCard;
