import React from 'react';
import {
  ComponentParams,
  TextField,
  ImageField,
  LinkField,
  FileField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import useUrl from 'src/hooks/useUrl';
import { useI18n } from 'next-localization';

import CustomCard from 'src/shared-components/CustomCard';

export interface TerminalFields {
  id: string;
  fields: {
    Location: LinkField;
    Name: TextField;
  };
}

export interface CountryFields {
  fields: {
    Name: TextField;
  };
}

export interface PageFields {
  Logo: ImageField;
  Name: TextField;
  Description: TextField;
  Terminals: Array<TerminalFields>;
  'Open Time': TextField;
  'Phone Number': TextField;
  Website: LinkField;
  File: FileField;
  Countries: Array<CountryFields>;
}

export type DetailCardProps = {
  params: ComponentParams;
  fields: PageFields;
  itemUrl: string;
};

const DetailCard = (props: DetailCardProps): JSX.Element => {
  const { itemUrl } = props;
  const { t } = useI18n();
  const fullUrl = useUrl(itemUrl);

  return (
    <CustomCard
      title={props.fields.Name}
      image={props.fields.Logo}
      description={props.fields.Description}
      openTime={props.fields['Open Time']}
      phoneNumber={props.fields['Phone Number']}
      website={props.fields.Website}
      terminals={props.fields.Terminals}
      btnText={t('threecolumnshops-viewDetails')}
      btnUrl={fullUrl}
    />
  );
};

export default DetailCard;
