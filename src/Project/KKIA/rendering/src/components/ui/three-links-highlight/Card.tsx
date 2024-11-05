import React from 'react';
import {
  LinkField,
  ImageField,
  Field,
  Image as JssImage,
  Link as JssLink,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface CardProps {
  title: Field<string>;
  description: Field<string>;
  link: LinkField;
  icon: ImageField;
}

const Card = ({ title, description, link, icon }: CardProps): JSX.Element => (
  <JssLink field={link} className="c-card rtl:flex-row-reverse">
    <div className="flex flex-row items-center rtl:flex-row-reverse">
      <JssImage className="c-card__img--icon rtl:ml-0 rtl:mr-[1.5rem]" field={icon} />
      <div className="c-card__text">
        <p className="c-card__text--title">
          <JSSText field={title} />
        </p>
        <p className="c-card__text--description">
          <JSSText field={description} />
        </p>
      </div>
    </div>
    <img
      className="c-card__img--arrow"
      src="/icons/three-links-arrow-right.svg"
      alt="arrow right"
    />
  </JssLink>
);

export default Card;
