import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Text as JssText,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Default as ThreeCardLinkItem, ThreeCardLinkItemFields } from 'src/atom/ThreeCardLinkItem';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import Button from 'src/shared-components/Button';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import CustomLink from 'src/shared-components/CustomLink';

interface ThreeCardLinkFields {
  Tag: TextField;
  Title: TextField;
  Items: Array<ThreeCardLinkItemProps>;
  Link: LinkField;
}

interface ThreeCardLinkItemProps {
  fields: ThreeCardLinkItemFields;
}

type ThreeCardLinkProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ThreeCardLinkFields;
};

export const Default = (props: ThreeCardLinkProps): JSX.Element => {
  const items = props.fields?.Items || [];

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div>
        <div className="flex flex-col gap-6 mb-6">
          <JssText tag="h6" className="text-muted-darkest" field={props.fields.Tag} />
          <JssText tag="p" className="text-muted-dark font-light" field={props.fields.Title} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <ThreeCardLinkItem key={index} params={props.params} fields={item.fields} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const ThreeCardsWithLink = (props: ThreeCardLinkProps): JSX.Element => {
  const items = props.fields?.Items || [];

  return (
    <SectionPaddingWrapper>
      <div className="text-body-medium-light text-muted-darkest my-6">
        <JssText field={props.fields.Tag} />
      </div>
      <div className="flex items-center justify-between w-full mb-6">
        <JssText
          tag="p"
          className="text-body-medium-light text-muted-darkest"
          field={props.fields.Title}
        />
        <Button
          variant="tertiary"
          field={props.fields.Link}
          rightIcon={<ArrowRightSvg />}
          className="md:mr-20"
        />
      </div>
      <div className="items-list flex gap-6 max-lg:flex-col">
        {items.map((item, index) => (
          <ThreeCardLinkItem key={index} params={props.params} fields={item.fields} />
        ))}
      </div>
    </SectionPaddingWrapper>
  );
};

export const CardsWithBadge = (props: ThreeCardLinkProps): JSX.Element => {
  const items = props.fields?.Items || [];

  return (
    <SectionPaddingWrapper>
      <div className="">
        <div>
          <JssText field={props.fields.Tag} />
        </div>
        <div>
          <JssText tag="span" className="text-muted-darker font-bold" field={props.fields.Title} />
        </div>
        <div className="field-promolink">
          <CustomLink field={props.fields.Link} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <ThreeCardLinkItem key={index} params={props.params} fields={item.fields} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export const ThreeCardsTwoByTwo = (props: ThreeCardLinkProps): JSX.Element => {
  const items = props.fields?.Items || [];

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div>
        <div className="flex flex-col gap-6 mb-6">
          <JssText tag="h6" className="text-muted-darkest" field={props.fields.Tag} />
          <JssText tag="p" className="text-muted-dark font-light" field={props.fields.Title} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <ThreeCardLinkItem key={index} params={props.params} fields={item.fields} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};
