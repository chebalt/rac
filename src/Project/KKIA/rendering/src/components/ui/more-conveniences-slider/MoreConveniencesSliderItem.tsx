import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface MoreConveniencesSliderItemFields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  Link: LinkField;
}

export type MoreConveniencesSliderItemProps = {
  id: string;
  fields: MoreConveniencesSliderItemFields;
};

const MoreConveniencesSliderItem = ({
  item,
}: {
  item: MoreConveniencesSliderItemProps;
}): JSX.Element => {
  return (
    <div className="w-full">
      <JssLink field={item.fields.Link}>
        <JssImage field={item.fields.Image} className="w-full h-[40vh] lg:h-[180px] object-cover" />
        <div className="p-6 min-h-[144px] bg-lightGray2">
          <h5 className="font-bold mb-5">
            <JssText field={item.fields.Title} />
          </h5>
          <h6 className="font-light text-muted-darker">
            <JssText field={item.fields.Description} />
          </h6>
        </div>
      </JssLink>
    </div>
  );
};

export default MoreConveniencesSliderItem;
