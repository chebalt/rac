import React, { useState } from 'react';
import ColumnSliderCarousel, {
  ColumnSliderTabProps,
} from './ui/column-slider/ColumnSliderCarousel';

export interface ColumnSliderFields {
  Tabs: ColumnSliderTabProps[];
}

export interface ColumnSliderProps {
  fields: ColumnSliderFields;
}

const ColumnSlider = (props: ColumnSliderProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="c-column-slider">
      <div className="c-column-slider__tabs xl:rtl:ml-auto">
        {props.fields.Tabs.map((tab, index) => (
          <button
            key={index}
            className={`c-column-slider__tabs--btn uppercase ${
              activeTab === index ? 'active' : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.fields['Tab Title'].value}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {props.fields.Tabs.map(
          (tab, index) =>
            activeTab === index && <ColumnSliderCarousel key={index} fields={tab.fields} />
        )}
      </div>
    </div>
  );
};

export default ColumnSlider;
