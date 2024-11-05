import React from 'react';
import { Text as JssText, TextField, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface NumberedTileProps {
  rendering: ComponentRendering;
  fields: {
    Number: TextField;
    Text: TextField;
  };
}

const NumberedTile = (props: NumberedTileProps): JSX.Element => {
  return (
    <div className="p-6 flex items-center gap-6 bg-surface-secondary-invert w-full rtl:flex-row-reverse">
      <div className="w-12 h-12 flex items-center justify-center bg-surface-primary rounded-full">
        <JssText
          field={props.fields.Number}
          tag="p"
          className="text-body-medium-bold text-text-action-secondary-default"
        />
      </div>

      <JssText
        field={props.fields.Text}
        tag="p"
        className="text-text-invert text-body-normal-regular "
      />
    </div>
  );
};

export default NumberedTile;
