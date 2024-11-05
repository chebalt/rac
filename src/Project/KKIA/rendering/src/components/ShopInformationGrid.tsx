import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

export type ShopInformationGridProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

export const ShopInformationGrid = (props: ShopInformationGridProps) => {
  const phKeyLeft = `kkia-shopdineexplore-shopinformationgridleft-${props.params.DynamicPlaceholderId}`;
  const phKeyRight = `kkia-shopdineexplore-shopinformationgridright-${props.params.DynamicPlaceholderId}`;
  return (
    <SectionPaddingWrapper className="py-14">
      <div className="flex max-xl:flex-col xl:flex-[0_0_100%] xl:max-w-full gap-24 max-xl:gap-4 rtl:flex-row-reverse rtl:max-xl:flex-col">
        <div className="w-full xl:flex-[0_0_50%] xl:max-w-[50%]">
          <Placeholder name={phKeyLeft} rendering={props.rendering} />
        </div>
        <Placeholder name={phKeyRight} rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ShopInformationGrid;
