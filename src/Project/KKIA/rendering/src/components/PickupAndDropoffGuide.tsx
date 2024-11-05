import React from 'react';
import {
  Text,
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

type PaymentMethodProps = {
  fields: {
    Name: TextField;
    Logo: ImageField;
  };
};

interface PickupAndDropoffGuideProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Coordinates: TextField;
    'First Note Title': TextField;
    'First Note Description': TextField;
    'First Note Icon': ImageField;
    'Second Note Title': TextField;
    'Second Note Description': TextField;
    'Second Note Icon': ImageField;
    'Payment Methods': PaymentMethodProps[];
    'Payment Methods Icon': ImageField;
  };
}

const PickupAndDropoffGuide = (props: PickupAndDropoffGuideProps): JSX.Element => {
  const { t } = useI18n();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const baseUrl = `https://www.google.com/maps/embed/v1/place`;
  const location = props.fields.Coordinates.value || '';
  const mapUrl = `${baseUrl}?q=${encodeURIComponent(location)}&key=${apiKey}`;

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <JssText
            field={props.fields.Title}
            tag="h2"
            className="text-headline-h2 text-text-primary"
          />
          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-body-medium-light text-text-secondary"
          />
        </div>
        <div className="flex flex-col gap-24 lg:flex-row rtl:lg:flex-row-reverse">
          <div className="lg:w-1/2 w-full">
            <div
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                color: 'red',
                height: '400px',
              }}
            >
              <div id="g-mapdisplay" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
                <iframe
                  style={{ height: '100%', width: '100%', border: 0 }}
                  src={mapUrl}
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps"
                />
              </div>
              <a
                className="googlecoder"
                rel="nofollow"
                href="https://www.bootstrapskins.com/themes"
                id="grab-maps-authorization"
              ></a>
              <style>
                {`
                #g-mapdisplay .text-marker {}
                .map-generator {
                  max-width: 100%;
                  max-height: 100%;
                  background: none;
                }
              `}
              </style>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:w-1/2">
            <div className="flex gap-4 rtl:flex-row-reverse">
              <div className="flex-shrink-0 w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                <JssImage field={props.fields['First Note Icon']} />
              </div>
              <div className="flex-grow flex flex-col gap-1">
                <JssText
                  field={props.fields['First Note Title']}
                  tag="h3"
                  className="text-body-medium-bold text-text-primary"
                />
                <JssText
                  field={props.fields['First Note Description']}
                  tag="p"
                  className="text-body-small-regular text-text-secondary"
                />
              </div>
            </div>
            <div className="flex gap-4 rtl:flex-row-reverse">
              <div className="flex-shrink-0 w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                <JssImage field={props.fields['Second Note Icon']} />
              </div>
              <div className="flex-grow flex flex-col gap-1">
                <JssText
                  field={props.fields['Second Note Title']}
                  tag="h3"
                  className="text-body-medium-bold text-text-primary"
                />
                <JssText
                  field={props.fields['Second Note Description']}
                  tag="p"
                  className="text-body-small-regular text-text-secondary"
                />
              </div>
            </div>
            <div className="flex gap-4 rtl:flex-row-reverse">
              <div className="flex-shrink-0 w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                <JssImage field={props.fields['Payment Methods Icon']} />
              </div>
              <div className="flex-grow flex flex-col gap-1">
                <h3 className="text-body-small-regular text-text-secondary">
                  {t('pickupanddropoffguide-paymentMetods')}
                </h3>
                <div className="flex flex-wrap md:gap-2 rtl:justify-end">
                  {props.fields['Payment Methods'].map((paymentMethod, index) => (
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
                            <JssImage
                              field={paymentMethod.fields.Logo}
                              className="w-[36px] h-[24px]"
                            />
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
            </div>
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default PickupAndDropoffGuide;
