import React from 'react';
import {
  Text,
  Image as JssImage,
  ComponentRendering,
  ImageField,
  TextField,
  LinkField,
  Link,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import PinSvg from 'assets/icons/PinSvg';

type AirlinePageProps = {
  fields: {
    Image: ImageField;
    'Company Location': LinkField;
    Name: TextField;
  };
};

interface AirlinePageHeroProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    Airline: AirlinePageProps | null;
  };
}

const AirlinePageHero = (props: AirlinePageHeroProps): JSX.Element => {
  const { Airline } = props.fields;
  const phKey = `kkia-flights-pagehero-${props.params.DynamicPlaceholderId}`;

  if (!Airline) {
    return <h1 className="py-40 m-auto">No Airline Selected</h1>;
  }

  return (
    <div className="relative w-full xl:h-[376px]">
      <div className="relative top-0 left-0 right-0 h-[326px]">
        <JssImage
          field={Airline.fields.Image}
          className="w-full h-full object-cover xl:object-[center_-320px]"
        />
        <SectionPaddingWrapper className="z-20 absolute top-0 left-0 right-0 bottom-0 bg-green-overlay flex flex-col justify-center">
          <h2 className="text-4xl md:text-[4rem] text-jade-light font-bold mb-3">
            <Text field={Airline.fields.Name} />
          </h2>
          <div className="text-jade-light flex items-center">
            <PinSvg />
            <h6 className="text-jade-light font-light ml-2">
              <Link field={Airline.fields['Company Location']} />
            </h6>
          </div>
        </SectionPaddingWrapper>
      </div>
      <SectionPaddingWrapper className="relative xl:absolute left-0 right-0 bottom-0 z-30 gap-x-4">
        <Placeholder name={phKey} rendering={props.rendering} />
      </SectionPaddingWrapper>
    </div>
  );
};

export default AirlinePageHero;
