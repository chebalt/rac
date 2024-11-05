import React from 'react';
import { Image as JssImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { CardSliderCTASlide } from 'components/CardSliderCTA';

const CardSliderCTAItem = ({ item }: { item: CardSliderCTASlide }): JSX.Element => {
  return (
    <div className="flex flex-col bg-background md:h-[420px] mb-4">
      <div className="h-[200px] relative">
        <JssImage field={item.fields.Image} className="absolute w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <h5 className="font-bold">
            <Text field={item.fields.Title} />
          </h5>

          <Text
            field={item.fields?.Description}
            tag="p"
            className="text-text-secondary text-body-normal-light"
          />
        </div>
      </div>
    </div>
  );
};

export default CardSliderCTAItem;
