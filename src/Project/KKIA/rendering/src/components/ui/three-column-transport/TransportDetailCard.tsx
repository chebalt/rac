import React from 'react';
import {
  ComponentParams,
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import CustomCard from 'src/shared-components/CustomCard';

export interface TerminalFields {
  id: string;
  fields: {
    Name: TextField;
    Location: LinkField;
  };
}

export interface TransportTypeFields {
  fields: {
    Type: TextField;
  };
}

export interface TransportPageFields {
  Image: ImageField;
  Name: TextField;
  'Open Time': TextField;
  Website: LinkField;
  Terminals: Array<TerminalFields>;
  'Transport Type': TransportTypeFields;
  'Phone Number': TextField;
}

export type TransportDetailCardProps = {
  params: ComponentParams;
  fields: TransportPageFields;
  itemUrl: string;
};

const TransportDetailCard = (props: TransportDetailCardProps): JSX.Element => {
  const { itemUrl } = props;
  const { t } = useI18n();

  const isRentCarPage =
    props.fields['Transport Type'].fields.Type.value?.toString().toLowerCase() === 'rent a car';

  return (
    <CustomCard
      btnText={t('threecolumnshops-viewDetails')}
      image={props.fields.Image}
      title={props.fields.Name}
      openTime={props.fields['Open Time']}
      phoneNumber={isRentCarPage ? props.fields['Phone Number'] : undefined}
      website={props.fields.Website}
      terminals={props.fields.Terminals}
      btnUrl={itemUrl}
    />
  );
};

export default TransportDetailCard;
