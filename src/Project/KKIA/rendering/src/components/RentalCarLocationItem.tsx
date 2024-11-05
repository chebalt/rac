import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  TextField,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PrimaryButton from '../shared-components/PrimaryButton';

interface RentalCarLocationItemFields {
  Title: TextField;
  Description: TextField;
  Link: LinkField;
  Icon: ImageField;
}

interface RentalCarLocationItemProps {
  fields: RentalCarLocationItemFields;
}

const RentalCarLocationItem = (props: RentalCarLocationItemProps): JSX.Element => {
  const { Title, Description, Link, Icon } = props.fields;

  return (
    <div className="rental-car-location-item pb-8 border-b border-background-variant">
      <div className="flex items-center gap-2 mb-4 rtl:flex-row-reverse">
        <JssImage field={Icon} className="rental-car-location-icon" />
        <JssText field={Title} tag="h5" className="text-muted-darker font-bold" />
      </div>
      <JssText className="text-muted-darker font-light" tag="h6" field={Description} />
      <div className="pt-6">
        <PrimaryButton fontSize="1.125rem" noUnderline field={Link} hasMaxWidth={false} />
      </div>
    </div>
  );
};

export default RentalCarLocationItem;
