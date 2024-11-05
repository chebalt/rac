import React from 'react';
import { ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Item from './ui/arline-details-3-columns/Item';
import GlobeSvg from 'assets/icons/GlobeSvg';

type AirlinePageProps = {
  fields: {
    'Phone Number': TextField;
    Website: TextField;
    Email: TextField;
  };
};

interface AirlineDetails3ColumnsProps {
  rendering: ComponentRendering;
  fields: {
    Airline: AirlinePageProps | null;
  };
}

const AirlineDetails3Columns = (props: AirlineDetails3ColumnsProps): JSX.Element => {
  const { Airline } = props.fields;
  const { t } = useI18n();

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/[^0-9+]/g, '');
  };

  if (!Airline) {
    return <p>No Airline Selected</p>;
  }

  return (
    <div className="w-full flex justify-between flex-col xl:flex-row px-6 xl:px-0">
      <Item
        title={t('airlinedetailpage-website')}
        value={Airline.fields.Website}
        icon={<GlobeSvg />}
      />
      <a
        href={`tel:${formatPhoneNumber(String(Airline.fields['Phone Number'].value))}`}
        className="w-full xl:mx-4"
      >
        <Item
          title={t('airlinedetailpage-phoneNumber')}
          value={Airline.fields['Phone Number']}
          icon={<GlobeSvg />}
        />
      </a>
      <Item title={t('airlinedetailpage-email')} value={Airline.fields.Email} icon={<GlobeSvg />} />
    </div>
  );
};

export default AirlineDetails3Columns;
