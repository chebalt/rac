import React from 'react';
import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface SalesCouponFields {
  Tag: TextField;
  Title: TextField;
  Description: TextField;
  Discount: TextField;
}

type SalesCouponProps = {
  fields: SalesCouponFields;
};

export const SalesCoupon = (props: SalesCouponProps): JSX.Element => {
  return (
    <div className="sales-coupon">
      <div className="coupon-tag p-8 space-y-4">
        <div className="bg-jade-light text-primary-dark-green text-sm font-normal px-2 inline uppercase">
          <JssText field={props.fields.Tag} />
        </div>
        <div className="flex space-y-1 flex-col">
          <h2 className="font-bold text-xl text-jade-darkest">
            <JssText field={props.fields.Title} />
          </h2>
          <p className="font-light text-base text-muted-darker">
            <JssText field={props.fields.Description} />
          </p>
        </div>
      </div>
      <div className="coupon-details p-8 hidden md:flex justify-center items-center">
        <p className="font-bold text-xl leading-7 text-center">
          <JssText field={props.fields.Discount} />
        </p>
      </div>
    </div>
  );
};
