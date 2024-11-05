import React from 'react';
import {
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface StatisticsIconsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
}

const StatisticsIcons = (props: StatisticsIconsProps): JSX.Element => {
  const phKey = `kkia-pagecontent-statisticsicons-${props.params.DynamicPlaceholderId}`;
  return (
    <SectionPaddingWrapper className="py-14">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default StatisticsIcons;
