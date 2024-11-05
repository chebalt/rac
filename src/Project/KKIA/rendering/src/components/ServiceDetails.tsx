import React from 'react';
import {
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  TextField,
  LinkField,
  RichTextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import PinSvg from 'assets/icons/PinSvg';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import CallSvg from 'assets/icons/CallSvg';
import EmailSvg from 'assets/icons/EmailSvg';

interface AreaOfLocationFields {
  fields: {
    'Location Name': TextField;
  };
}

interface TerminalFields {
  fields: {
    Location: LinkField;
    Abbreviation: TextField;
    Area: AreaOfLocationFields;
  };
}

interface PaymentMethodProps {
  fields: {
    Name: TextField;
  };
}

interface ServiceDetailsProps {
  rendering: ComponentRendering;
  fields: {
    Description: RichTextField;
    OpenHours: RichTextField;
    PhoneNumber: LinkField;
    Email: LinkField;
    Coordinates: TextField;
    Terminals: TerminalFields[];
    IncludeAreaOfTerminal: boolean;
    PaymentMethods: PaymentMethodProps[];
  };
}

const ServiceDetails = (props: ServiceDetailsProps): JSX.Element => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const baseUrl = `https://www.google.com/maps/embed/v1/place`;
  const location = props.fields.Coordinates?.value || '';
  const mapUrl = `${baseUrl}?q=${encodeURIComponent(location)}&key=${apiKey}`;
  const { t } = useI18n();
  const PaymentMethods = props.fields.PaymentMethods || [];

  return (
    <SectionPaddingWrapper className="py-10 md:py-20">
      <div className="flex flex-col md:flex-row md:justify-between w-full gap-24">
        <div className="md:w-1/2 flex flex-col gap-10">
          <JssRichText
            field={props.fields.Description}
            tag="p"
            className="text-text-secondary text-body-medium-light"
          />
          <div className="w-full">
            {location ? (
              <iframe
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                title="Google Maps"
                className="w-full h-[348px]"
              />
            ) : (
              <p>No location provided</p>
            )}
          </div>
        </div>
        <div className="md:w-1/2 bg-surface-secondary p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary text-body-medium-regular">
              {t('serviceDetails-terminal')}
            </p>
            {props.fields.Terminals.map((terminal, index) => (
              <div key={index} className="flex w-full justify-between">
                <div className="flex gap-[0.625rem]">
                  <PinSvg className="w-5 h-5 text-icon-primary" />
                  <JssText
                    field={terminal.fields.Abbreviation}
                    tag="p"
                    className="text-text-primary text-body-medium-bold"
                  />
                  {/* {props.fields.IncludeAreaOfTerminal && (
                    <div>
                      <JssText field={terminal.fields.Area.fields['Location Name']} />
                    </div>
                  )} */}
                </div>
                <a
                  href={terminal.fields.Location.value.href}
                  className="flex gap-2 text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover hover:underline active:text-text-action-secondary-press"
                >
                  {t('serviceDetails-getDirections')}
                  <ArrowRightSvg className="w-6 h-6 text-icon-primary" />
                </a>
              </div>
            ))}
            <div className="border border-border-primary"></div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary text-body-medium-regular">
              {t('serviceDetails-openingHours')}
            </p>
            <JssRichText field={props.fields.OpenHours} />
            <div className="border border-border-primary"></div>
          </div>
          {PaymentMethods.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-text-secondary text-body-medium-regular">
                {t('serviceDetails-paymentMethods')}
              </p>
              <div className="flex flex-wrap md:gap-2">
                {PaymentMethods.map((method, index) => (
                  <div key={index}>
                    <JssText
                      field={method.fields.Name}
                      tag="p"
                      className="text-text-primary text-body-medium-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {(props.fields.PhoneNumber || props.fields.Email) && (
            <div className="flex flex-col gap-4">
              <p className="text-text-secondary text-body-medium-regular">
                {t('serviceDetails-contact')}
              </p>

              {props.fields.PhoneNumber && (
                <div className="flex items-center gap-[0.625rem]">
                  <CallSvg className="w-5 h-5 text-icon-primary" />
                  <JssLink
                    field={props.fields.PhoneNumber}
                    className="text-text-primary text-body-medium-bold"
                  />
                </div>
              )}
              {props.fields.Email && (
                <div className="flex items-center gap-[0.625rem]">
                  <JssLink
                    field={props.fields.Email}
                    className="text-text-primary text-body-medium-bold"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ServiceDetails;
