import React from 'react';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  ComponentRendering,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import Button from 'src/shared-components/Button';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import CustomLink from 'src/shared-components/CustomLink';

interface CardItem {
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Description: Field<string>;
    CTA: LinkField;
  };
}

interface TopAttractionsProps {
  rendering: ComponentRendering;
  fields: {
    Header: Field<string>;
    Cards: CardItem[];
    Link: LinkField;
  };
}

const TopAttractions = (props: TopAttractionsProps): JSX.Element => {
  const cardItems = props.fields.Cards || [];
  return (
    <SectionPaddingWrapper>
      <div className={`component`}>
        <div className="component-content py-14 max-xl:py-10 flex flex-col">
          <div className="font-bold text-[2rem] mb-10 md:mb-14 text-jade-darkest rtl:text-right">
            <Text field={props.fields.Header} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
            {cardItems.map((cardItem, index) => (
              <div key={index} className="w-full bg-background-dark">
                <JssImage field={cardItem.fields.Image} class="h-[180px] object-cover" />
                <div className="p-6 space-y-5 flex flex-col">
                  <h4 className="text-xl font-bold text-jade-darkest">
                    <Text field={cardItem.fields.Title} />
                  </h4>
                  <p className="mt-5 text-base font-light text-muted-darker">
                    <Text field={cardItem.fields.Description} />
                  </p>
                  <Button
                    field={cardItem.fields.CTA}
                    variant="tertiary"
                    rightIcon={<ArrowRightSvg />}
                    className="rtl:w-full rtl:justify-end"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CustomLink
              field={props.fields.Link}
              className="px-6 py-4 text-jade-darker bg-primary-variant font-bold text-lg w-full md:w-fit text-center"
            />
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default TopAttractions;
