import React, { useState } from 'react';
import { ComponentRendering, TextField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import PlacesCardSliderCarousel from './ui/places-card-slider/PlacesCardSliderCarousel';
import { Text18, Text32 } from 'src/shared-components/Texts';
import ArrowGroup from 'src/shared-components/ArrowGroup';

type PlacesCard = {
  fields: {
    'Tab Title': TextField;
    Title: TextField;
    Description: TextField;
    'First Place Image': ImageField;
    'First Image Title': TextField;
    'Second Place Image': ImageField;
    'Second Image Title': TextField;
  };
};

interface PlacesCardSliderProps {
  rendering: ComponentRendering;
  fields: {
    Cards: PlacesCard[];
    'Overlay Image': ImageField;
  };
}

const PlacesCardSlider: React.FC<PlacesCardSliderProps> = ({ fields }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const currentTab = fields.Cards[activeTab];

  return (
    <SectionPaddingWrapper className="bg-primary-dark-green-variant py-10 xl:py-24">
      <div className="flex flex-col xl:flex-row rtl:xl:flex-row-reverse justify-between">
        <div className="flex flex-col w-full xl:max-w-[335px] xl:pt-24 rtl:items-end">
          <div className="mb-4 flex rtl:justify-end">
            {fields.Cards.map((card, index) => (
              <button
                key={index}
                className={`c-places-card-slider__tabs--btn ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {card.fields['Tab Title'].value}
              </button>
            ))}
          </div>
          <div>
            <Text32 field={currentTab.fields.Title} className="text-white" hasMarginBottom />
            <Text18 field={currentTab.fields.Description} className="text-white" hasMarginBottom />
          </div>
          <div className="hidden xl:block w-24">
            <ArrowGroup
              nextBtnClassName="placesCardSlider-button-next"
              prevBtnClassName="placesCardSlider-button-prev"
            />
          </div>
        </div>
        <PlacesCardSliderCarousel
          fields={{ ...currentTab.fields, 'Overlay Image': fields['Overlay Image'] }}
        />
      </div>
    </SectionPaddingWrapper>
  );
};

export default PlacesCardSlider;
