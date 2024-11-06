import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  LinkField,
  TextField,
  Image,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import clsx from 'clsx';
import { Text32 } from 'src/shared-components/Texts';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';

interface ExploreCardsFields {
  Cards: Array<ExploreCardProps>;
  Title: TextField;
}

type ExploreCardsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ExploreCardsFields;
};

export interface ExploreCardFields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  Link: LinkField;
}

export type ExploreCardProps = {
  params: ComponentParams;
  fields: ExploreCardFields;
  id: string;
};

const Default = (props: ExploreCardsProps): JSX.Element => {
  const cards = props.fields?.Cards || [];

  return (
    <section>
      <SectionPaddingWrapper>
        <div className="flex flex-wrap justify-between pt-14 max-xl:pt-10">
          {cards.map((card) => (
            <div
              className={clsx(
                'relative w-full md:w-[49%] h-[420px] mb-14',
                'shadow-lg',
                'flex flex-col justify-end'
              )}
              key={card.id}
            >
              <div className="bg-green-overlay absolute top-0 left-0 right-0 bottom-0 z-40" />
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <Image field={card.fields.Image} className="h-full w-full object-cover" />
              </div>
              <div className="relative p-6 z-50">
                <Text32 className="text-jade-light font-bold mb-3" field={card.fields.Title} />
                <p className="text-jade-light mb-3">
                  <Text field={card.fields.Description} />
                </p>
                <Button
                  field={card.fields.Link}
                  variant={'tertiary'}
                  className="text-lg text-white hover:text-white hover:border-white"
                  rightIcon={<ArrowIconSvg />}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionPaddingWrapper>
    </section>
  );
};

const ExploreCardsWithTitle = (props: ExploreCardsProps): JSX.Element => {
  const cards = props.fields?.Cards || [];

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col items-center gap-8">
        <Text field={props.fields.Title} tag="h2" className="text-headline-h2 text-text-primary" />
        <div className="flex flex-wrap justify-between">
          {cards.map((card) => (
            <div
              className={clsx(
                'relative w-full md:w-[49%] h-[300px]',
                'shadow-lg',
                'flex flex-col justify-end'
              )}
              key={card.id}
            >
              <div className="bg-green-overlay absolute top-0 left-0 right-0 bottom-0 z-40" />
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <Image field={card.fields.Image} className="h-full w-full object-cover" />
              </div>
              <div className="relative p-6 z-50">
                <Text
                  className="text-headline-h2 text-text-invert"
                  tag="h3"
                  field={card.fields.Title}
                />

                <Text
                  field={card.fields.Description}
                  tag="p"
                  className="text-text-invert text-body-medium-regular"
                />

                <Button
                  field={card.fields.Link}
                  variant={'tertiary'}
                  className="text-lg text-white hover:text-white hover:border-white"
                  rightIcon={<ArrowIconSvg />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export { Default, ExploreCardsWithTitle };
