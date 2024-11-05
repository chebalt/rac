import React from 'react';
import {
  ComponentRendering,
  ImageField,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface ArrivalTimeInformationBoxProps {
  rendering: ComponentRendering;
  fields: {
    'Information Icon': ImageField;
    'Refresh Icon': ImageField;
  };
}

const ArrivalTimeInformationBox = (props: ArrivalTimeInformationBoxProps): JSX.Element => {
  const { t } = useI18n();

  return (
    <SectionPaddingWrapper className="pt-10 md:pt-14 pb-8">
      <div className="flex justify-between p-6 bg-info-light border border-info max-xl:flex-col-reverse max-xl:gap-3 rtl:flex-row-reverse rtl:max-xl:flex-col">
        <div className="flex items-center gap-3 max-xl:items-baseline rtl:flex-row-reverse">
          <JssImage field={props.fields['Information Icon']} />
          <h5 className="text-info font-bold">
            {t('arrivalTimeInformationBox-estimatedTime')}
            45-60
            {t('arrivalTimeInformationBox-minutes')}
          </h5>
        </div>
        <div className="flex items-center gap-1 dir-rtl">
          <span className="text-info text-sm">
            {t('arrivalTimeInformationBox-updated')}
            11:23
          </span>
          <JssImage field={props.fields['Refresh Icon']} />
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ArrivalTimeInformationBox;
