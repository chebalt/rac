import React from 'react';
import {
  Text as JssText,
  ComponentRendering,
  withDatasourceCheck,
  TextField,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ShopDetailCard, {
  ShopPageFields,
} from 'src/components/ui/three-columns-shops/ShopDetailCard';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import ServiceDetailCard, { ServicePageFields } from 'src/atom/ServiceDetailCard';

type ShopPageProps = {
  fields: ShopPageFields;
  id: string;
  url: string;
};

type ServicePageProps = {
  fields: ServicePageFields;
  id: string;
  url: string;
};

interface OtherShopRecommendationsProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Shops: Array<ShopPageProps> | null;
    Services: Array<ServicePageProps> | null;
  };
  params: ComponentParams;
}

const OtherShopRecommendations = (props: OtherShopRecommendationsProps): JSX.Element => {
  const { Title, Shops, Services } = props.fields;
  const trimmedShopsList = Shops?.slice(0, 3);
  const trimmedServicesList = Services?.slice(0, 3);

  return (
    <SectionPaddingWrapper className="w-full py-14">
      <JssText field={Title} tag="h2" className="mb-8 text-headline-h2 text-text-primary" />

      <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {trimmedShopsList?.length ? (
          trimmedShopsList.map((shop) => (
            <ShopDetailCard
              key={shop.id}
              fields={shop.fields}
              itemUrl={shop.url}
              params={props.params}
            />
          ))
        ) : trimmedServicesList?.length ? (
          trimmedServicesList.map((service) => (
            <ServiceDetailCard
              key={service.id}
              fields={service.fields}
              itemUrl={service.url}
              params={props.params}
            />
          ))
        ) : (
          <h2 className="py-20">No Recommendations Available</h2>
        )}
      </div>
    </SectionPaddingWrapper>
  );
};

export default withDatasourceCheck()<OtherShopRecommendationsProps>(OtherShopRecommendations);
