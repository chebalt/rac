import React from 'react';
import {
  TextField,
  ImageField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  LinkField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Text16, Text18, Text20, Text48 } from 'src/shared-components/Texts';
import Button from 'src/shared-components/Button';

interface ServicesClassesCardFields {
  Image: ImageField;
  Title: TextField;
  Value: TextField;
  Currency: TextField;
  Description: TextField;
  Text: TextField;
  Link: LinkField;
}

interface ServicesClassesCardProps {
  fields: ServicesClassesCardFields;
  rendering: ComponentRendering;
  params: ComponentParams;
}

const ServicesClassesCard = (props: ServicesClassesCardProps): JSX.Element => {
  const { Image, Title, Value, Currency, Description, Text, Link } = props.fields;
  const placeholderKey = `kkia-pagecontent-serviceclassescarditems-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="w-full p-6 bg-white shadow-default border flex flex-col items-center">
      <NextImage field={Image} className="mb-3" />
      <Text18 field={Title} className="mb-3 font-bold text-muted-darker" />
      <div className="flex items-end gap-x-2 className='mb-3'">
        <Text48 field={Value} />
        <Text20 field={Currency} />
      </div>
      <Text16 field={Description} className="mb-8 text-muted-darker" />
      <div className="w-full">
        <hr className="my-4 w-full" />
        <Text16 field={Text} className="font-bold py-8 text-muted-darker" />
        <div className="gap-y-2">
          <Placeholder name={placeholderKey} rendering={props.rendering} />
        </div>
        <Button variant="primary" field={Link} className="w-full md:w-full mt-6" />
      </div>
    </div>
  );
};

export default ServicesClassesCard;
