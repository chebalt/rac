import React from 'react';
import {
  ComponentRendering,
  TextField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ParkingPageProps = {
  fields: {
    Coordinates: TextField;
  };
};

interface ParkingMapProps {
  rendering: ComponentRendering;
  fields: {
    Parking: ParkingPageProps | null;
  };
}

const ParkingMap = (props: ParkingMapProps): JSX.Element => {
  const { Parking } = props.fields;

  if (!Parking) {
    return <p>No Parking Selected</p>;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const baseUrl = `https://www.google.com/maps/embed/v1/place`;
  const location = Parking.fields.Coordinates.value || '';
  const mapUrl = `${baseUrl}?q=${encodeURIComponent(location)}&key=${apiKey}`;

  return (
    <div className="py-10 md:pb-0">
      <div className={`mapContainer`}>
        <div id="g-mapdisplay" className={`mapDisplay`}>
          <iframe
            className={`iframe`}
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
      </div>
    </div>
  );
};

export default withDatasourceCheck()<ParkingMapProps>(ParkingMap);
