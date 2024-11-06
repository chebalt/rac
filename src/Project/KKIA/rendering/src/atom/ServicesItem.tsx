import React from 'react';
import { LinkField, Image as JssImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

export interface ServicesItemFields {
  Link: LinkField;
  Icon: ImageField;
}

export type ServicesItemProps = {
  fields: ServicesItemFields;
};

const ServicesItem = (props: ServicesItemProps): JSX.Element => {
  return (
    <div className="services-item border border-muted-variant border-solid bg-background p-6 flex items-center gap-6 rtl:flex-row-reverse">
      <div className="bg-jade-light w-[48px] h-[48px] rounded-full flex justify-center items-center rtl:flex-row-reverse">
        <JssImage field={props.fields.Icon} />
      </div>
      <h5 className="font-bold text-muted-darkest">
        <CustomLink field={props.fields.Link} />
      </h5>
    </div>
  );
};

export default ServicesItem;
