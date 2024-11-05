import React from 'react';
import BenefitTile, { BenefitTileProps } from 'src/atom/BenefitTile';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

export interface BenefitTilesFields {
  Tiles?: BenefitTileProps[];
}

export interface BenefitTilesProps {
  fields: BenefitTilesFields;
}

const BenefitTiles = (props: BenefitTilesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col md:flex-row gap-8">
        {props.fields.Tiles?.map((tile, index) => (
          <BenefitTile key={index} fields={tile.fields} />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export default BenefitTiles;
