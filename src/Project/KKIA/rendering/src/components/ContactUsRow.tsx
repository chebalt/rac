import React from 'react';
import {
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ContactUsRowProps {
  rendering: ComponentRendering;
  params: ComponentParams;
}

const ContactUsRow = (props: ContactUsRowProps): JSX.Element => {
  const phKeyTile = `kkia-pagecontent-contact-tile-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <Placeholder name={phKeyTile} rendering={props.rendering} />
    </div>
  );
};

export default ContactUsRow;
