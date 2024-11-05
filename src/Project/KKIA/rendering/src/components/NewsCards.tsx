import React from 'react';
import {
  ComponentRendering,
  Text,
  LinkField,
  TextField,
  ComponentParams,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NewsCardsItem from './ui/news-cards/NewsCardsItem';
import DocumentIconSvg from 'assets/icons/DocumentIconSvg';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import SecondaryButton from 'src/shared-components/SecondaryButton';
import NewsCardsCarousel from './ui/news-cards/NewsCardsCarousel';
import ArrowGroup from 'src/shared-components/ArrowGroup';

type NewsCardsProps = {
  rendering: ComponentRendering;
  fields: NewsCardsFields;
};
interface NewsCardsFields {
  Title: TextField;
  Description: TextField;
  News: NewsCardsItemProps[];
  Button: LinkField;
}
export type NewsCardsItemProps = {
  params: ComponentParams;
  fields: NewsCardsItemFields;
  itemUrl: string;
  url?: string;
};

export interface NewsCardsItemFields {
  Image: ImageField;
  'Publication Date': {
    value?: string;
    editable?: string;
  };
  Description: TextField;
  NewsType: {
    fields?: {
      Name?: {
        value?: string;
      };
    };
  };
}

export const Default = (props: NewsCardsProps): JSX.Element => {
  const newsItems = props.fields.News || [];

  return (
    <SectionPaddingWrapper className="w-full bg-lightGray py-16 xl:px-4">
      <div className="flex items-center gap-[0.5rem] mb-[1rem] rtl:justify-end">
        <div className="text-lightGreen text-base mr-1">
          <DocumentIconSvg />
        </div>
        <span className="uppercase">
          <Text field={props.fields.Title} />
        </span>
      </div>
      <div className="flex justify-between items-center mb-[3rem] rtl:flex-row-reverse">
        <h3 className="font-bold text-muted-darkest text-[2.25rem]">
          <Text field={props.fields.Description} />
        </h3>
        <div className="hidden md:block">
          <ArrowGroup
            nextBtnClassName="newsCards-button-next"
            prevBtnClassName="newsCards-button-prev"
          />
        </div>
      </div>
      <div className="hidden md:block select-none">
        <NewsCardsCarousel cards={[...newsItems, ...newsItems]} />
      </div>
      <div className="block md:hidden">
        {newsItems.map((newsItem, index) => (
          <NewsCardsItem key={index} {...newsItem} />
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <SecondaryButton field={props.fields.Button} />
      </div>
    </SectionPaddingWrapper>
  );
};

export const NewsDetailPage = (props: NewsCardsProps): JSX.Element => {
  const newsItems = props.fields.News || [];

  return (
    <SectionPaddingWrapper className="w-full bg-lightGray py-16 xl:px-4">
      <div className="flex flex-col gap-[3.5rem]">
        <Text field={props.fields.Title} tag="h2" className="text-headline-h2 text-text-primary" />

        <div className="hidden md:block select-none">
          <NewsCardsCarousel cards={[...newsItems, ...newsItems]} />
        </div>
        <div className="block md:hidden">
          {newsItems.map((newsItem, index) => (
            <NewsCardsItem key={index} {...newsItem} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};
