import React from 'react';
import {
  Text as JssText,
  TextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface RentalCarLocationFields {
  Title: TextField;
}

interface RentalCarLocationProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: RentalCarLocationFields;
}

const RentalCarLocation = (props: RentalCarLocationProps): JSX.Element => {
  const { Title } = props.fields;
  const phKey = `kkia-rentalcarlocation-terminals-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-14 max-xl:py-10">
      <JssText field={Title} tag="h3" className="font-bold mb-10" />
      <div className="rental-car-location w-full xl:flex-[0_0_50%] xl:max-w-[50%]">
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default RentalCarLocation;
