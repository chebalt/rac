import clsx from 'clsx';
import {
  Text as JssText,
  RichTextField,
  TextField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ReactNode } from 'react';

const defaultMarginBottom = 'mb-4';

export const Text12 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field?: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <p className={clsx('text-[0.75rem]', hasMarginBottom && defaultMarginBottom, className)}>
      {field ? <JssText field={field} /> : children}
    </p>
  );
};

export const Text14 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field?: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <p className={clsx('text-[0.875rem]', hasMarginBottom && defaultMarginBottom, className)}>
      {field ? <JssText field={field} /> : children}
    </p>
  );
};

export const Text16 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field?: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <p className={clsx('text-[1rem]', hasMarginBottom && defaultMarginBottom, className)}>
      {field ? <JssText field={field} /> : children}
    </p>
  );
};

export const Text18 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field?: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <p className={clsx('text-[1.125rem]', hasMarginBottom && defaultMarginBottom, className)}>
      {field ? <JssText field={field} /> : children}
    </p>
  );
};

export const Text32 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <h2
      className={clsx('text-[2rem] font-bold', hasMarginBottom && defaultMarginBottom, className)}
    >
      {field ? <JssText field={field} /> : children}
    </h2>
  );
};

export const Text20 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <h4
      className={clsx(
        'text-[1.25rem] font-bold',
        hasMarginBottom && defaultMarginBottom,
        className
      )}
    >
      {field ? <JssText field={field} /> : children}
    </h4>
  );
};

export const Text48 = ({
  className,
  field,
  hasMarginBottom,
  children,
}: {
  className?: HTMLElement['className'];
  field: TextField;
  hasMarginBottom?: boolean;
  children?: ReactNode;
}) => {
  return (
    <h2 className={clsx('text-5xl font-bold', hasMarginBottom && defaultMarginBottom, className)}>
      {field ? <JssText field={field} /> : children}
    </h2>
  );
};

export const CustomRichText = ({ value }: { value: RichTextField }) => {
  return (
    <div className="custom-rich-text rtl:text-right">
      <JssRichText field={value} />
      <style jsx>
        {`
          .custom-rich-text {
            font-size: 1.125rem;
            && p {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};
