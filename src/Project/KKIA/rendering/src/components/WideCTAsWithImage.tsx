import React from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import WideCTAWithImage, { WideCTAWithImageProps } from 'src/atom/WideCTAWithImage';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface WideCTAsWithImageProps {
  rendering: ComponentRendering;
  fields: {
    'CTA Banners': Array<WideCTAWithImageProps>;
  };
}

const WideCTAsWithImage = (props: WideCTAsWithImageProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="pb-14">
      <div className="flex flex-col gap-8">
        {props.fields['CTA Banners'].map((cta, index) => (
          <WideCTAWithImage key={index} fields={cta.fields} />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export default WideCTAsWithImage;
