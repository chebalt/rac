import React from 'react';
import { Text as JssText, TextField, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import LostAndFoundOffice, { LostAndFoundOfficeProps } from 'src/atom/LostAndFoundOffice';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface LostAndFoundOfficesProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Coordinates: TextField;
    Offices: LostAndFoundOfficeProps[];
  };
}

const LostAndFoundOffices = (props: LostAndFoundOfficesProps): JSX.Element => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const baseUrl = `https://www.google.com/maps/embed/v1/place`;
  const location = props.fields.Coordinates?.value || '';
  const mapUrl = `${baseUrl}?q=${encodeURIComponent(location)}&key=${apiKey}`;

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <JssText
              field={props.fields.Title}
              tag="h2"
              className="text-jade-darkest text-body-normal-regular"
            />
            <JssText
              field={props.fields.Description}
              tag="p"
              className="text-muted-darker text-lg font-light"
            />
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            {props.fields.Offices?.map((office, index) => (
              <LostAndFoundOffice key={index} fields={office.fields} />
            ))}
          </div>
        </div>
        <div>
          {location ? (
            <iframe
              src={mapUrl}
              allowFullScreen
              loading="lazy"
              title="Google Maps"
              className="w-full h-[654px]"
            />
          ) : (
            <p>No location provided</p>
          )}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default LostAndFoundOffices;
