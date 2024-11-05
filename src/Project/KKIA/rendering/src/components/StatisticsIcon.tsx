import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Text16, Text20 } from 'src/shared-components/Texts';

interface StatisticIconFields {
  Title: TextField;
  Description: TextField;
  Icon: ImageField;
}

interface StatisticIconProps {
  fields: StatisticIconFields;
}

const StatisticIcon = (props: StatisticIconProps): JSX.Element => {
  const { Title, Description, Icon } = props.fields;

  return (
    <div className="flex flex-col items-center">
      <JssImage field={Icon} className="statistic-icon-image mb-6" />
      <Text20 field={Title} className="font-bold mb-2" />
      <Text16 field={Description} />
    </div>
  );
};

export default StatisticIcon;
