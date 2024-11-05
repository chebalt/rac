import React from 'react';
import { ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';

export interface ImageCTARewardItemFields {
  Image: ImageField;
}

export type ImageCTARewardItemProps = {
  fields: ImageCTARewardItemFields;
};

const ImageCTARewardsItem: React.FC<ImageCTARewardItemProps> = ({ fields }) => {
  return (
    <div className="relative w-full h-full">
      <NextImage
        field={fields.Image}
        fill
        className="w-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-125"
      />
    </div>
  );
};

export default ImageCTARewardsItem;
