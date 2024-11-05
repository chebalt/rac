import { LinkField, TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import ThingsToDoSliderItem, { ThingsToDoSliderItemProps } from 'src/atom/ThingsToDoSliderItem';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import ArrowGroup from '../shared-components/ArrowGroup';
import SecondaryButton from '../shared-components/SecondaryButton';
import ThingsToDoCarousel from 'components/ui/things-to-do/ThingsToDoCarousel';

export interface ThingsToDoSliderFields {
  Items: ThingsToDoSliderItemProps[];
  Title: TextField;
  Description: TextField;
  Link: LinkField;
}

export interface ThingsToDoSliderProps {
  fields: ThingsToDoSliderFields;
}

const ThingsToDoSlider = (props: ThingsToDoSliderProps): JSX.Element => {
  const items = props.fields.Items || [];

  return (
    <SectionPaddingWrapper className="w-full bg-jade-light py-14 max-xl:py-10 px-4">
      <div className="flex items-center gap-[0.5rem] mb-6 rtl:flex-row-reverse">
        <h3 className="font-bold text-[2rem]">
          <Text field={props.fields.Title} />
        </h3>
      </div>
      <div className="flex justify-between items-center mb-14 rtl:flex-row-reverse">
        <span className="text-[1.125rem] text-muted-darker">
          <Text field={props.fields.Description} />
        </span>
        <div className="hidden md:block">
          <ArrowGroup
            nextBtnClassName="thingsToDo-button-next"
            prevBtnClassName="thingsToDo-button-prev"
          />
        </div>
      </div>
      <div className="hidden md:block select-none">
        <ThingsToDoCarousel cards={[...items, ...items]} />
      </div>
      <div className="block md:hidden">
        {items.map((item, index) => (
          <ThingsToDoSliderItem key={index} fields={item.fields} />
        ))}
      </div>
      <div className="flex justify-center max-md:w-full">
        <SecondaryButton className="text-lg" field={props.fields.Link} hasIcon />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ThingsToDoSlider;
