import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Link } from '@sitecore-jss/sitecore-jss-react';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';
import clsx from 'clsx';

export default function PrimaryButton({
  field,
  isLight,
  url,
  text,
  noUnderline,
  noIcon,
  hasMaxWidth = true,
  fontSize,
  icon,
  className,
}: {
  field?: LinkField;
  isLight?: boolean;
  url?: string;
  text?: string;
  noUnderline?: boolean;
  noIcon?: boolean;
  hasMaxWidth?: boolean;
  fontSize?: string;
  icon?: JSX.Element | null;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        'w-auto py-2 md:px-1 flex items-center justify-between md:hover:opacity-50 rtl:w-full rtl:justify-end',
        isLight ? 'text-white border-white' : 'text-primary-dark-green border-primary-dark-green',
        { 'border-b-2': !noUnderline },
        { 'max-w-32': hasMaxWidth },
        className
      )}
    >
      <div style={{ fontSize: `${fontSize}` }} className="font-bold mr-2">
        {text ? <a href={url}>{text}</a> : field && <Link field={field} />}
      </div>
      {!noIcon && (icon !== undefined ? icon : <ArrowIconSvg />)}
    </button>
  );
}
