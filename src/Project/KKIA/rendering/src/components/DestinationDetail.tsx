import React from 'react';
import { Text as JssText, TextField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import TerminalBox from 'src/shared-components/CustomCard/TerminalBox';

interface DestinationPageFields {
  'City Name': TextField;
  Airlines: AirlinePageProps[] | null;
  'Section Heading': TextField;
  'Section Text': TextField;
}

interface AirlinePageProps {
  fields: {
    Name: TextField;
    'Sale Office Location': LinkField;
  };
}

type DestinationDetailProps = {
  fields: Pick<DestinationPageFields, 'Section Heading' | 'Section Text' | 'Airlines'>;
};

export const DestinationDetail = (props: DestinationDetailProps): JSX.Element => {
  const { t } = useI18n();
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-4 mb-8">
        <p className="text-muted-darker text-xs font-normal uppercase">
          <JssText field={props.fields['Section Heading']} />
        </p>
        <h3 className="text-jade-darkest text-[2rem] font-bold">
          <JssText field={props.fields['Section Text']} />
        </h3>
      </div>

      {props.fields.Airlines && props.fields.Airlines.length > 0 && (
        <div className="overflow-x-auto">
          <div className="border border-jade-light bg-jade-light w-full md:max-w-[820px] min-w-[600px]">
            <div className="flex bg-jade-light">
              <div className="text-muted-darkest font-bold text-base px-3 py-6 max-w-[200px] md:max-w-none flex-grow">
                {t('destinationandterminalinfo-airlines')}
              </div>
              <div className="text-muted-darkest font-bold text-base px-3 py-6 flex-shrink-0 w-[30%]">
                {t('destinationandterminalinfo-terminal')}
              </div>
            </div>
            {props.fields.Airlines.map((airline, index) => (
              <div
                key={index}
                className="airline-item bg-background border-b border-l border-r border-jade-dark py-2 flex"
              >
                <div className="text-primary-dark-green-variant px-3 py-6 max-w-[200px] md:max-w-none flex-grow">
                  <JssText field={airline.fields.Name} />
                </div>
                <div className="px-3 py-6 flex-shrink-0 w-[30%]">
                  <TerminalBox field={airline.fields['Sale Office Location']} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionPaddingWrapper>
  );
};
