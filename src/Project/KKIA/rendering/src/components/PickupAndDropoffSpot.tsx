import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  ComponentRendering,
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';

interface PickupAndDropoffSpotProps {
  rendering: ComponentRendering;
  fields: {
    'Pickup Description': TextField;
    'Dropoff Description': TextField;
    'Pickup Icon': ImageField;
    'Dropoff Icon': ImageField;
    'Pickup Link': LinkField;
    'Dropoff Link': LinkField;
    'Link Icon': ImageField;
    'Pickup Coordinates': TextField;
    'Dropoff Coordinates': TextField;
  };
}

const PickupAndDropoffSpot = (props: PickupAndDropoffSpotProps): JSX.Element => {
  const { t } = useI18n();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const pickupLocation = props?.fields['Pickup Coordinates'].value || '';
  const dropoffLocation = props?.fields['Dropoff Coordinates'].value || '';
  const baseUrl = `https://www.google.com/maps/embed/v1/directions`;
  const mapUrl = `${baseUrl}?key=${apiKey}&origin=${encodeURIComponent(
    pickupLocation
  )}&destination=${encodeURIComponent(dropoffLocation)}&mode=walking`;

  return (
    <div className="pb-4 pt-10 max-xl:pb-0">
      <div className="flex max-xl:flex-col gap-24 rtl:flex-row-reverse rtl:max-xl:flex-col">
        <div>
          <div className="pb-8 border-b border-background-variant">
            <div className="flex items-center gap-2 mb-4 rtl:flex-row-reverse">
              <JssImage field={props.fields['Pickup Icon']} />
              <h5 className="text-muted-darker font-bold">{t('pickupanddropoffspot-pickUp')}</h5>
            </div>
            <JssText
              className="text-muted-darker font-light"
              tag="h6"
              field={props.fields['Pickup Description']}
            />
            <div className="pt-6">
              <Button
                variant="tertiary"
                field={props.fields['Pickup Link']}
                rightIcon={<ArrowIconSvg />}
              />
            </div>
          </div>
          <div className="pt-8">
            <div className="flex items-center gap-2 mb-4 rtl:flex-row-reverse">
              <JssImage field={props.fields['Dropoff Icon']} />
              <h5 className="text-muted-darker font-bold">{t('pickupanddropoffspot-dropOff')}</h5>
            </div>
            <JssText
              className="text-muted-darker font-light"
              tag="h6"
              field={props.fields['Dropoff Description']}
            />
            <div className="py-6">
              <Button
                variant="tertiary"
                field={props.fields['Pickup Link']}
                rightIcon={<ArrowIconSvg />}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              color: 'red',
              width: '650px',
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
      </div>
    </div>
  );
};

export default PickupAndDropoffSpot;
