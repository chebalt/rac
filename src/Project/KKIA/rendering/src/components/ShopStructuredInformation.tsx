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
import LocationIconSvg from 'assets/icons/LocationIconSvg';
import PhoneIconSvg from 'assets/icons/PhoneIconSvg';
import CashPayMethodIconSvg from 'assets/icons/CashPayMethodIconSvg';

type TerminalProps = {
  fields: {
    Location: LinkField;
    Name: TextField;
  };
};

type PaymentMethodProps = {
  fields: {
    Name: TextField;
    Logo: ImageField;
  };
};

type ShopProps = {
  fields: {
    Terminals: TerminalProps[];
    'Open Time': TextField;
    'Payment Methods': PaymentMethodProps[];
    'Phone Number': TextField;
  };
};

interface ShopStructuredInformationProps {
  rendering: ComponentRendering;
  fields: {
    Shop: ShopProps | null;
  };
}

const ShopStructuredInformation = (props: ShopStructuredInformationProps): JSX.Element => {
  const { t } = useI18n();
  const { Shop } = props.fields;

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/[^0-9+]/g, '');
  };

  return (
    <div className="bg-jade-light p-8 w-full">
      {Shop ? (
        <>
          <div className="border-b border-jade-dark">
            <h2 className="text-lg text-muted-darker mb-4">
              {t('shopstructuredinformation-terminal')}
            </h2>
            {Shop.fields.Terminals.map((terminal, index) => (
              <div className="flex justify-between mb-[1.125rem]" key={index}>
                <div className="flex items-center gap-2.5">
                  <LocationIconSvg />
                  <p className="text-lg font-bold">
                    <Text field={terminal.fields.Name} />
                  </p>
                </div>
                <div className="c-column-slider-item__link">
                  <a
                    className="c-column-slider-item__link--container whitespace-nowrap text-lg"
                    href={terminal.fields.Location.value.href}
                  >
                    {t('shopstructuredinformation-getDirections')}
                  </a>
                  <img src="/icons/hero-slider-arrow-right.svg" alt="link" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-b border-jade-dark py-6">
            <h2 className="text-lg text-muted-darker mb-4">
              {t('shopstructuredinformation-openingHours')}
            </h2>
            <p className="text-lg">
              <Text field={Shop.fields['Open Time']} />
            </p>
          </div>
          <div className="border-b border-jade-dark py-6">
            <h2 className="text-lg text-muted-darker mb-4">
              {t('shopstructuredinformation-paymentMethods')}
            </h2>
            <div className="flex items-center gap-2 w-full rtl:justify-end">
              {Shop.fields['Payment Methods'].map((paymentMethod, index) => {
                if (paymentMethod.fields.Name.value === 'Cash') {
                  return <CashPayMethodIconSvg key={index} />;
                }
                return (
                  <div key={index}>
                    {paymentMethod.fields.Logo.value?.src ? (
                      <JssImage className="w-[36px] h-[24px]" field={paymentMethod.fields.Logo} />
                    ) : (
                      <Text field={paymentMethod.fields.Name} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-b border-jade-dark py-6">
            <h2 className="text-lg text-muted-darker mb-4">
              {t('shopstructuredinformation-contact')}
            </h2>
            <div className="flex items-center gap-2.5 rtl:flex-row-reverse">
              <PhoneIconSvg />
              <a
                className="text-lg text-jade-darkest font-bold"
                href={`tel:${formatPhoneNumber(String(Shop.fields['Phone Number'].value))}`}
              >
                <Text field={Shop.fields['Phone Number']} />
              </a>
            </div>
          </div>
        </>
      ) : (
        <p>No Shop Selected</p>
      )}
    </div>
  );
};

export default withDatasourceCheck()<ShopStructuredInformationProps>(ShopStructuredInformation);
