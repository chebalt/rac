import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ListItemWithIcon, { ListItemWithIconProps } from 'src/atom/ListItemWithIcon';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface ListWithIconsProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Image: ImageField;
    ListItems: ListItemWithIconProps[];
  };
}

const ListWithIcons = (props: ListWithIconsProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <div className="flex justify-between items-center w-full max-lg:flex-col max-lg:gap-6">
        <div className="flex flex-col gap-6 lg:max-w-[490px]">
          <JssText tag="h3" className="font-bold" field={props.fields.Title} />
          <JssText
            tag="p"
            className="font-light text-muted-darker"
            field={props.fields.Description}
          />
          <div className="flex flex-col gap-4">
            {props.fields.ListItems.map((listItem, index) => (
              <ListItemWithIcon key={index} fields={listItem.fields} />
            ))}
          </div>
        </div>
        <div className="lg:w-[400px] w-full">
          <JssImage
            className="w-full h-full max-h-[528px] object-cover"
            field={props.fields.Image}
          />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ListWithIcons;
