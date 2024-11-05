import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface LinkWithIconCustomProps {
  field: LinkField;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  containerClassName?: string;
  iconClassName?: string;
  linkClassName?: string;
}

export default function LinkWithIconCustom({
  field,
  iconLeft,
  iconRight,
  containerClassName,
  iconClassName,
  linkClassName,
}: LinkWithIconCustomProps) {
  return (
    <Link field={field} className={clsx(containerClassName)}>
      {iconLeft && (
        <div className={clsx('inline-flex items-center', iconClassName)}>{iconLeft}</div>
      )}

      <span className={clsx(linkClassName)}>{field.value.text}</span>

      {iconRight && (
        <div className={clsx('inline-flex items-center', iconClassName)}>{iconRight}</div>
      )}
    </Link>
  );
}
