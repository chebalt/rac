import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface ParkingInformationGridProps {
  rendering: ComponentRendering;
  params: ComponentParams;
}

const ParkingInformationGrid = (props: ParkingInformationGridProps): JSX.Element => {
  const phKeyLeft = `kkia-parkingandtransport-parkinginformationgridleft-${props.params.DynamicPlaceholderId}`;
  const phKeyRight = `kkia-parkingandtransport-parkinginformationgridright-${props.params.DynamicPlaceholderId}`;

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex max-xl:flex-col xl:flex-[0_0_100%] xl:max-w-full gap-24 max-xl:gap-4">
        <div className="w-full xl:flex-[0_0_50%] xl:max-w-[50%]">
          <Placeholder name={phKeyLeft} rendering={props.rendering} />
        </div>
        <Placeholder name={phKeyRight} rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ParkingInformationGrid;
