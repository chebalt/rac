import React from 'react';
import { TextField, Text as JssText, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface WifiInformationProps {
  rendering: ComponentRendering;
  fields: {
    Header: TextField;
    Title: TextField;
    Description: TextField;
    'Wifi Name': TextField;
  };
}

const WifiInformation = (props: WifiInformationProps): JSX.Element => {
  const { t } = useI18n();

  return (
    <SectionPaddingWrapper className="pt-10 md:pt-14">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between rtl:flex-row-reverse">
            <JssText
              field={props.fields.Header}
              tag="p"
              className="text-muted-darker text-sm leading-6 font-normal"
            />
            <div className="hidden md:flex">
              <p className="font-light text-lg leading-8 text-jade-darkest">
                {t('wifiInformation-wifiName')}
              </p>
              <JssText
                field={props.fields['Wifi Name']}
                tag="p"
                className="font-normal text-lg text-jade-darkest"
              />
            </div>
          </div>

          <JssText
            field={props.fields.Title}
            tag="h2"
            className="text-jade-darkest text-[2rem] leading-[3rem] font-bold"
          />

          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-muted-darker text-lg font-light"
          />
        </div>

        <div className="flex md:hidden">
          <p className="font-light text-lg leading-8 text-jade-darkest">
            {t('wifiInformation-wifiName')}
          </p>
          <JssText
            field={props.fields['Wifi Name']}
            tag="p"
            className="font-normal text-lg text-jade-darkest"
          />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default WifiInformation;
