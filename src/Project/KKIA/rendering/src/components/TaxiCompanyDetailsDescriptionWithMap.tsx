import React from 'react';
import { Text as JssText, LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

type TaxiCompanyDetailsDescriptionWithMapProps = {
  fields: {
    Description: TextField;
    Location: LinkField;
  };
};

const TaxiCompanyDetailsDescriptionWithMap = (
  props: TaxiCompanyDetailsDescriptionWithMapProps
): JSX.Element => {
  const { Description, Location } = props.fields || {};

  const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const locationUrl = Location?.value?.href || '';

  return (
    <div>
      <JssText tag="p" className="font-light text-muted-darker mb-10" field={Description} />
      <div className="h-[376px] w-full">
        {locationUrl ? (
          <iframe
            className="h-full w-full border-none"
            src={`${locationUrl}&key=${api_key}`}
            allowFullScreen
            loading="lazy"
            title="Google Maps"
          />
        ) : (
          <p>No location provided</p>
        )}
      </div>
    </div>
  );
};

export default TaxiCompanyDetailsDescriptionWithMap;
