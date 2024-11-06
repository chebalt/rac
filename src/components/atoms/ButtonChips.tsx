import NextLink from 'next/link';
import ChevronRight from '../icons/ChevronRight';
import { Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';

export interface ButtonChipsProps {
  /** URL for the button */
  url?: string;
  /** Sitecore Link field for the button */
  field?: LinkField;
  /** Text displayed on the button */
  label: string;
  /** Icon displayed on the button */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** onClick handler */
  onClick?: () => void;
}

/** Button component with a link or a button */
export default function ButtonChips({
  url,
  field,
  label,
  icon,
  disabled = false,
  onClick,
}: ButtonChipsProps) {
  const commonClassName = 'flex items-center gap-2 py-1 pl-2 transition-colors';

  const variantClassName = clsx(
    disabled
      ? 'border border-border-action-disabled text-text-action-disabled cursor-not-allowed'
      : 'border border-border-action-secondary-default hover:outline hover:outline-1 hover:outline-border-action-secondary-hover active:border-border-action-secondary-press text-text-primary focus:outline-none focus:ring-2 focus:ring-border-action-focus focus:ring-offset-2'
  );

  const iconClassName = clsx(
    disabled
      ? 'text-icon-action-disabled'
      : 'text-icon-action-secondary-default group-hover:text-icon-action-secondary-hover group-active:text-icon-action-secondary-press'
  );

  const content = (
    <>
      {icon && <span className={iconClassName}>{icon}</span>}
      <span>{label}</span>
      <ChevronRight className={clsx('h-5 w-5', iconClassName)} />
    </>
  );

  if (disabled) {
    return <div className={clsx(commonClassName, variantClassName)}>{content}</div>;
  }

  if (field) {
    return (
      <JssLink field={field} className={clsx('group', commonClassName, variantClassName)}>
        {content}
      </JssLink>
    );
  }

  if (url) {
    return (
      <NextLink href={url} className={clsx('group', commonClassName, variantClassName)}>
        {content}
      </NextLink>
    );
  }

  return (
    <button className={clsx('group', commonClassName, variantClassName)} onClick={onClick}>
      {content}
    </button>
  );
}
