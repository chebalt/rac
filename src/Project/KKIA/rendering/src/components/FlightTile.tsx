import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface HeroTileProps {
  fields: {
    HeaderIcon?: ImageField;
    Header?: TextField;
    Text?: TextField;
    SupportiveText?: TextField;
    AdditionalIcon?: ImageField;
    AdditionalText?: TextField;
    AdditionalSupportiveText?: TextField;
    MissingDataText?: TextField;
  };
}

const FlightTile = (props: HeroTileProps): JSX.Element => {
  return (
    <div className="w-full p-8 bg-jade-light flex items-center mt-6 xl:mt-0 border-r border-jade-dark truncate">
      <div className="text-primary-dark-green flex flex-col items-cente gap-4 w-full truncate">
        <div className="flex items-center gap-2">
          <JssImage className="w-[20px] h-[20px] object-cover" field={props.fields.HeaderIcon} />
          <JssText
            tag="p"
            className="text-body-medium-regular text-muted-darker"
            field={props.fields.Header}
          />
        </div>
        <div className="flex items-center gap-2">
          <JssText
            tag="p"
            className="text-body-large-bold text-jade-darkest"
            field={props.fields.Text}
          />
          <JssText
            tag="p"
            className="text-body-medium-regular text-muted-darker truncate"
            field={props.fields.SupportiveText}
          />
        </div>
        <div className="flex items-center gap-2">
          <JssImage
            className="w-[20px] h-[20px] object-cover"
            field={props.fields.AdditionalIcon}
          />
          <JssText
            tag="p"
            className="text-body-large-bold text-jade-darkest"
            field={props.fields.AdditionalText}
          />
          <JssText
            tag="p"
            className="text-body-medium-regular text-muted-darker truncate"
            field={props.fields.AdditionalSupportiveText}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightTile;
