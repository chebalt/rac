import React from 'react';
import {
  ComponentRendering,
  ImageField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ShopPicturesCarousel from 'components/ui/shop-slider/ShopPicturesCarousel';

type ShopImageProps = {
  fields: {
    Image: ImageField;
  };
};

type ShopPageProps = {
  fields: {
    Images: ShopImageProps[];
  };
};

interface ShopPicturesSliderProps {
  rendering: ComponentRendering;
  fields: {
    Shop: ShopPageProps | null;
  };
}

const ShopPicturesSlider = (props: ShopPicturesSliderProps): JSX.Element => {
  const { Shop } = props.fields;

  if (!Shop || !Shop.fields.Images || Shop.fields.Images.length === 0) {
    return <p>No Images Available</p>;
  }

  return <ShopPicturesCarousel images={Shop.fields.Images} />;
};

export default withDatasourceCheck()<ShopPicturesSliderProps>(ShopPicturesSlider);
