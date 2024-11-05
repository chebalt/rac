import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';

interface LostItemTileFields {
  fields: {
    Title: TextField;
    Description: TextField;
    Icon: ImageField;
    Link: LinkField;
  };
}

interface LostItemTilesProps {
  rendering: ComponentRendering;
  fields: {
    Title: TextField;
    Description: TextField;
    Tiles: LostItemTileFields[];
  };
}

export const Default = (props: LostItemTilesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14 bg-jade-light">
      <div className=" flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <JssText
            field={props.fields.Title}
            tag="h2"
            className="text-jade-darkest text-[2rem] font-bold leading-[3rem]"
          />
          <JssText
            field={props.fields.Description}
            tag="p"
            className="text-muted-darker text-lg font-light"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {props.fields.Tiles?.map((tile, index) => (
            <div key={index} className="flex flex-col gap-5 p-6 bg-background rtl:items-end">
              <JssImage field={tile.fields.Icon} className="w-6 h-6 text-primary-dark-green" />

              <JssText
                field={tile.fields.Title}
                tag="h3"
                className="text-jade-darkest text-xl font-bold"
              />

              <JssText
                field={tile.fields.Description}
                tag="p"
                className="text-muted-darker text-base font-light"
              />

              <div className="flex items-center gap-2 relative max-w-fit">
                <JssLink
                  field={tile.fields.Link}
                  className="pr-8 relative z-10 text-primary-dark-green text-lg font-bold"
                />
                <ArrowRightSvg className="absolute right-0 z-0 text-primary-dark-green" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const FAQTiles = (props: LostItemTilesProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {props.fields.Tiles?.map((tile, index) => (
          <div key={index} className="flex flex-col gap-5 p-6 bg-background-dark">
            <JssImage field={tile.fields.Icon} className="w-6 h-6 text-primary-dark-green" />

            <JssText
              field={tile.fields.Title}
              tag="h3"
              className="text-jade-darkest text-xl font-bold"
            />

            <JssText
              field={tile.fields.Description}
              tag="p"
              className="text-muted-darker text-base font-light"
            />

            <div className="flex items-center gap-2 relative max-w-fit">
              <JssLink
                field={tile.fields.Link}
                className="pr-8 relative z-10 text-primary-dark-green text-lg font-bold"
              />
              <ArrowRightSvg className="absolute right-0 z-0 text-primary-dark-green" />
            </div>
          </div>
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};
