import React from 'react';
import {
  Text,
  withDatasourceCheck,
  ComponentRendering,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ParkingPageProps = {
  fields: {
    Description: TextField;
  };
};

interface ParkingDescriptionProps {
  rendering: ComponentRendering;
  fields: {
    Parking: ParkingPageProps | null;
  };
}

const ParkingDescription = (props: ParkingDescriptionProps): JSX.Element => {
  const { Parking } = props.fields;

  return (
    <div className="mb-8 md:mb-0">
      {Parking ? (
        <div className="font-light text-lg text-muted-darker">
          <Text field={Parking.fields.Description} />
        </div>
      ) : (
        <p>No Parking Selected</p>
      )}
    </div>
  );
};

export default withDatasourceCheck()<ParkingDescriptionProps>(ParkingDescription);
