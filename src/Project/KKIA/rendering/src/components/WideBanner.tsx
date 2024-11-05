import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ImageSideFields {
  fields: {
    Name: TextField;
  };
}

interface WideBannerProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Image: ImageField;
    'Image Side': ImageSideFields;
  };
}

const WideBanner = (props: WideBannerProps): JSX.Element => {
  const isImageOnLeftSide =
    props.fields['Image Side'].fields.Name.value?.toString().toLowerCase() === 'left';

  if (isImageOnLeftSide) {
    return (
      <div className="wide-banner">
        <div>
          <div>
            <JssImage field={props.fields.Image} />
          </div>
        </div>
        <div>
          <div>
            <JssText field={props.fields.Title} />
          </div>
          <div>
            <JssText field={props.fields.Description} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wide-banner">
      <div>
        <div>
          <JssText field={props.fields.Title} />
        </div>
        <div>
          <JssText field={props.fields.Description} />
        </div>
      </div>
      <div>
        <div>
          <JssImage field={props.fields.Image} />
        </div>
      </div>
    </div>
  );
};

export default WideBanner;
