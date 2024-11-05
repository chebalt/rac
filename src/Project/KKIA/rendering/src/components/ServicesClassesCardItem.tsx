import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Text16 } from 'src/shared-components/Texts';

interface ServicesClassesCardItemFields {
  Icon: ImageField;
  Title: TextField;
}

interface ServicesClassesCardItemProps {
  fields: ServicesClassesCardItemFields;
}

const ServicesClassesCardItem = (props: ServicesClassesCardItemProps): JSX.Element => {
  const { Icon, Title } = props.fields;

  return (
    <div className="flex gap-x-2 rtl:flex-row-reverse">
      <JssImage field={Icon} />
      <Text16 field={Title} className="text-muted-darker" />
    </div>
  );
};

export default ServicesClassesCardItem;
