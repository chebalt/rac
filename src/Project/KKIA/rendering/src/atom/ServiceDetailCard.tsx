import React from 'react';
import {
  ComponentParams,
  Field,
  TextField,
  ImageField,
  LinkField,
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

export interface BenefitFields {
  fields: {
    Name: TextField;
    Icon: Field<string>;
  };
}

export interface ServicePageFields {
  Image: ImageField;
  Name: TextField;
  Description: TextField;
  Category: CategoryFields;
  Terminals: Array<TerminalFields>;
  'Open Time': TextField;
  'Phone Number': TextField;
  Website: LinkField;
  Benefits: Array<BenefitFields>;
}

export type ServiceDetailCardProps = {
  params: ComponentParams;
  fields: ServicePageFields;
  itemUrl: string;
};

const ServiceDetailCard = (props: ServiceDetailCardProps): JSX.Element => {
  const { itemUrl } = props;
  const { t } = useI18n();

  return (
    <CustomCard
      title={props.fields.Name}
      description={props.fields.Description}
      category={props.fields.Category?.fields.Name}
      image={props.fields.Image}
      openTime={props.fields['Open Time']}
      phoneNumber={props.fields['Phone Number']}
      website={props.fields.Website}
      btnText={t('threecolumnservices-viewDetails')}
      terminals={props.fields.Terminals?.map((terminal) => ({
        id: terminal.id,
        fields: {
          Location: terminal.fields.Location,
        },
      }))}
      btnUrl={itemUrl}
    />
  );
};

export default ServiceDetailCard;
