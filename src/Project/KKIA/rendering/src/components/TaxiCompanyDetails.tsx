import React from 'react';
import {
  Image as JssImage,
  TextField,
  LinkField,
  ImageField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { useI18n } from 'next-localization';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import LocationIconSvg from 'assets/icons/LocationIconSvg';

interface AreaOfTerminalProps {
  fields: {
    'Location Name': TextField;
  };
}

interface TerminalProps {
  fields: {
    Location: LinkField;
    Abbreviation: TextField;
    Area: AreaOfTerminalProps;
  };
}

interface PaymentMethodProps {
  fields: {
    Name: TextField;
    Logo: ImageField;
  };
}

interface TaxiCompanyDetailsFields {
  Terminals: TerminalProps[];
  'Open Hours': TextField;
  'Open Hours Grey Text': TextField;
  'Include Area of Terminal': {
    value: boolean;
  };
  'Payment Methods': PaymentMethodProps[];
  'Contact Title': TextField;
  Contact: TextField;
}

interface TaxiCompanyDetailsProps {
  rendering: ComponentRendering;
  fields: TaxiCompanyDetailsFields;
  params: ComponentParams;
}

const TaxiCompanyDetails = (props: TaxiCompanyDetailsProps): JSX.Element => {
  const { t } = useI18n();
  const phKeyLeft = `kkia-pagecontent-taxicompanydetailspage-left-${props.params.DynamicPlaceholderId}`;
  const {
    Terminals,
    'Open Hours': OpenHours,
    'Payment Methods': PaymentMethods,
    'Open Hours Grey Text': OpenHoursGreyText,
    'Contact Title': ContactTitle,
    'Include Area of Terminal': IncludeAreaofTerminal,
    Contact,
  } = props.fields;

  const contactValue = String(Contact.value ?? '').replace(/\s+/g, '');
  const isPhoneNumber = /^\+\d+$/.test(contactValue);

  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="flex max-xl:flex-col xl:flex-[0_0_100%] xl:max-w-full gap-24 max-xl:gap-10 rtl:flex-row-reverse rtl:max-xl:flex-col">
        <div className="w-full xl:flex-[0_0_50%] xl:max-w-[50%]">
          <Placeholder name={phKeyLeft} rendering={props.rendering} />
        </div>
        <div className="bg-jade-light p-8 w-full h-fit">
          <div className="border-b border-jade-dark">
            <h2 className="text-lg text-muted-darker mb-4">{t('taxicompanydetails-terminal')}</h2>
            {Terminals.map((terminal, index) => {
              let areaName = terminal.fields.Area?.fields['Location Name']?.value?.toString() || '';

              areaName = areaName === '' ? areaName : `(${areaName})`;

              return (
                <div key={index} className="flex flex-col mb-[1.125rem]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <LocationIconSvg />
                      <p className="text-lg font-bold">
                        <Text field={terminal.fields.Abbreviation} />
                      </p>
                      {IncludeAreaofTerminal.value && (
                        <p className="text-md text-muted truncate flex-shrink-0">{areaName}</p>
                      )}
                    </div>
                    <div className="c-column-slider-item__link">
                      <a
                        className="c-column-slider-item__link--container whitespace-nowrap text-lg"
                        href={terminal.fields.Location.value.href}
                      >
                        {t('taxicompanydetails-getDirections')}
                      </a>
                      <img src="/icons/hero-slider-arrow-right.svg" alt="link" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-jade-dark py-6">
            <h2 className="text-lg text-muted-darker mb-4">
              {t('taxicompanydetails-openingHours')}
            </h2>
            <div className="flex items-center gap-2.5 rtl:justify-end">
              <p className="text-lg font-bold">
                <Text field={OpenHours} />
              </p>
              <p className="text-md text-muted">
                <Text field={OpenHoursGreyText} />
              </p>
            </div>
          </div>
          {props.fields['Payment Methods'].some(
            (paymentMethod) =>
              paymentMethod.fields.Logo.value && paymentMethod.fields.Logo.value.src
          ) ? (
            <div className="border-b border-jade-dark py-6">
              <h2 className="text-lg text-muted-darker mb-4">
                {t('taxicompanydetails-paymentMethods')}
              </h2>
              <div className="flex flex-wrap md:gap-2 rtl:justify-end">
                {props.fields['Payment Methods'].map((paymentMethod, index) => (
                  <React.Fragment key={index}>
                    {paymentMethod.fields.Logo.value && paymentMethod.fields.Logo.value.src && (
                      <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center">
                          <JssImage
                            field={paymentMethod.fields.Logo}
                            className="w-[36px] h-[24px]"
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="pt-6">
            <h2 className="text-lg text-muted-darker mb-4">
              <Text field={ContactTitle} />
            </h2>
            <a
              href={isPhoneNumber ? `tel:${contactValue}` : contactValue}
              target="_blank"
              className="text-lg text-jade-darkest font-bold rtl:block"
            >
              <Text field={Contact} />
            </a>
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default TaxiCompanyDetails;
