import { Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';

interface MenuItemProps {
  /** The href of the menu item */
  field: LinkField;
  /** Whether the menu item is active */
  isActive?: boolean;
}

/**
 * A component that displays a menu item
 */
export default function MenuItem({ field, isActive = false }: MenuItemProps) {
  return null;
  /*  FIX ME
  return (
    <JssLink
      field={field}
      className={clsx(
        'text-body-normal-regular hover:text-text-action-tertiary-hover active:text-text-action-tertiary-press border-b-[3px] border-transparent p-2 text-text-action-tertiary-default transition-all duration-300 hover:border-border-action-primary-hover focus:shadow-outline focus:outline-none',
        isActive &&
          'text-body-normal-bold text-text-action-secondary-default hover:border-border-action-secondary-hover active:border-border-action-secondary-press'
      )}
    />
  );
  */
}
