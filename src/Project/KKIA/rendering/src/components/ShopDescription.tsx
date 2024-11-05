import React from 'react';
import {
  Text,
  withDatasourceCheck,
  ComponentRendering,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ShopPageProps = {
  fields: {
    Description: TextField;
  };
};

interface ShopDescriptionProps {
  rendering: ComponentRendering;
  fields: {
    Shop: ShopPageProps | null;
  };
}

const ShopDescription = (props: ShopDescriptionProps): JSX.Element => {
  const { Shop } = props.fields;

  return (
    <div className="mb-8">
      {Shop ? (
        <>
          <p className="text-muted-darker font-light">
            <Text field={Shop.fields.Description} />
          </p>
        </>
      ) : (
        <p>No Shop Selected</p>
      )}
    </div>
  );
};

export default withDatasourceCheck()<ShopDescriptionProps>(ShopDescription);
