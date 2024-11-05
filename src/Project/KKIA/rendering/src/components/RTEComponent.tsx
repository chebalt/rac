import React from 'react';
import { RichTextField, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

export interface RTEComponentFields {
  Editor: RichTextField;
}
export type RTEComponentProps = {
  fields: RTEComponentFields;
};

const RTEComponent = (props: RTEComponentProps): JSX.Element => {
  return (
    <div className="rte-component w-full">
      <JssRichText field={props.fields.Editor} />
    </div>
  );
};

export default RTEComponent;
