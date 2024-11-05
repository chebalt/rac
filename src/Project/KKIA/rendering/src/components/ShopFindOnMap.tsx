import React from 'react';
import {
  Text as JssText,
  ComponentRendering,
  withDatasourceCheck,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

type ShopPageProps = {
  fields: {
    Location: LinkField;
  };
};

interface ShopFindOnMapProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Shop: ShopPageProps | null;
  };
}

const ShopFindOnMap = (props: ShopFindOnMapProps): JSX.Element => {
  const { Title, Shop } = props.fields;

  const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const shopLocation = Shop?.fields.Location.value || '';

  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <JssText field={Title} tag="h2" className="mb-8 text-headline-h2 text-text-primary" />
      {Shop ? (
        <div className="map-container h-[680px]">
          {shopLocation ? (
            <div className="h-full">
              <div className="h-full" id="g-mapdisplay">
                <iframe
                  style={{ height: '100%', width: '100%', border: 0 }}
                  src={shopLocation.href + '&key=' + api_key}
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
                `}
              </style>
            </div>
          ) : (
            <p>No location provided</p>
          )}
        </div>
      ) : (
        <p>No Shop Selected</p>
      )}
    </SectionPaddingWrapper>
  );
};

export default withDatasourceCheck()<ShopFindOnMapProps>(ShopFindOnMap);
