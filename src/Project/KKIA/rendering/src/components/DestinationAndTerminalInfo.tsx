import React from 'react';
import { ComponentRendering, TextField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { Text32 } from 'src/shared-components/Texts';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import Row from './ui/destination-and-terminal-info/Row';

type Terminal = {
  fields: {
    Name: TextField;
    Location: LinkField;
  };
};

type Destination = {
  fields: {
    'Destination City': TextField;
    Terminal: Terminal;
  };
};

interface DestinationAndTerminalInfoProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Destinations: Destination[];
  };
}

const DestinationAndTerminalInfo = (props: DestinationAndTerminalInfoProps): JSX.Element => {
  const { t } = useI18n();
  return (
    <SectionPaddingWrapper className="py-14">
      <Text32 field={props.fields.Title} className="mb-8" />
      <div className="w-full">
        <Row
          isHeader
          destination={t('destinationandterminalinfo-destination')}
          terminalName={t('destinationandterminalinfo-terminal')}
          location={t('destinationandterminalinfo-location')}
        />
        {props.fields.Destinations.map((destination, index) => (
          <Row
            key={index}
            destination={destination.fields['Destination City']}
            location={destination.fields.Terminal.fields.Location}
            terminalName={destination.fields.Terminal.fields.Name}
          />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export default DestinationAndTerminalInfo;
