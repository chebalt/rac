import React from 'react';
import {
  Text,
  Image as JssImage,
  LinkField,
  ComponentRendering,
  withDatasourceCheck,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import PinSvg from 'assets/icons/PinSvg';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import CallSvg from 'assets/icons/CallSvg';
import EmailSvg from 'assets/icons/EmailSvg';
import CustomLink from 'src/shared-components/CustomLink';

type TerminalProps = {
  fields: {
    Location: LinkField;
    Abbreviation: TextField;
  };
};

type PaymentMethodProps = {
  fields: {
    Name: TextField;
    Logo: ImageField;
  };
};

type ParkingProps = {
  fields: {
    Terminals: TerminalProps[];
    'Payment Methods': PaymentMethodProps[];
    'Phone Number': TextField;
    Email: LinkField;
    Capacity: TextField;
  };
};

interface ParkingStructuredInformationProps {
  rendering: ComponentRendering;
  fields: {
    Parking: ParkingProps | null;
  };
}

const ParkingStructuredInformation = (props: ParkingStructuredInformationProps): JSX.Element => {
  const { t } = useI18n();
  const { Parking } = props.fields;

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/[^0-9+]/g, '');
  };

  const formatCapacity = (capacity: string | number | undefined) => {
    if (capacity === undefined) {
      return '';
    }
    const capacityStr =
      typeof capacity === 'number' ? capacity.toString() : capacity.replace(/\s/g, '');

    return capacityStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!Parking) {
    return <p>No Parking Selected</p>;
  }

  return (
    <div className="w-full">
      <div className="p-8 bg-jade-light">
        <div className="flex flex-col gap-4 pb-4 border-b border-jade-dark mb-6">
          <div className="text-lg font-normal text-muted-darker">
            {t('parkingstructuredinformation-terminal')}
          </div>
          <div>
            {Parking.fields.Terminals.map((terminal, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex items-center gap-[0.625rem]">
                  <PinSvg className="w-5 h-5 text-primary-dark-green" />
                  <Text
                    field={terminal.fields.Abbreviation}
                    tag="p"
                    className="text-lg font-bold"
                  />
                </div>

                <CustomLink
                  url={terminal.fields.Location.value.href}
                  className="flex gap-2 text-primary-dark-green font-bold text-lg"
                >
                  {t('parkingstructuredinformation-getDirections')}

                  <ArrowRightSvg className="w-6 h-6 text-primary-dark-green" />
                </CustomLink>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4 border-b border-jade-dark mb-6">
          <div className="text-muted-darker text-lg font-normal">
            {t('parkingstructuredinformation-parkingCapacity')}
          </div>
          <p className="text-lg font-bold text-jade-darkest">
            {formatCapacity(Parking.fields.Capacity.value)}
          </p>
        </div>
        <div className="flex flex-col gap-4 pb-4 border-b border-jade-dark mb-6">
          <div className="text-muted-darker text-lg font-normal">
            {t('parkingstructuredinformation-paymentMethods')}
          </div>
          <div className="flex flex-wrap md:gap-2">
            {Parking.fields['Payment Methods'].map((paymentMethod, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2">
                  <div className="flex md:hidden items-center">
                    {index > 0 && <span className="mx-2 text-black">•</span>}
                    <Text
                      field={paymentMethod.fields.Name}
                      tag="p"
                      className="text-lg font-bold text-jade-darkest"
                    />
                  </div>
                  <div className="hidden md:flex items-center">
                    {paymentMethod.fields.Logo.value?.src ? (
                      <JssImage field={paymentMethod.fields.Logo} className="w-[36px] h-[24px]" />
                    ) : (
                      <div className="flex items-center">
                        {index > 0 && <span className="mx-2 text-black">•</span>}
                        <Text
                          field={paymentMethod.fields.Name}
                          tag="p"
                          className="text-lg font-bold text-jade-darkest"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-normal text-muted-darker">
            {t('parkingstructuredinformation-contact')}
          </div>
          <div>
            <a
              href={`tel:${formatPhoneNumber(String(Parking.fields['Phone Number'].value))}`}
              className="text-lg font-bold text-jade-darkest flex gap-[0.625rem]"
            >
              <CallSvg className="w-5 h-5 text-primary-dark-green" />
              <Text field={Parking.fields['Phone Number']} />
            </a>
          </div>
          <div className="flex gap-[0.625rem] items-center">
            <EmailSvg className="w-5 h-5 text-primary-dark-green flex-shrink-0" />
            <CustomLink
              field={Parking.fields.Email}
              className="text-lg font-bold text-jade-darkest"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<ParkingStructuredInformationProps>(
  ParkingStructuredInformation
);
