import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import Tick from '../icons/Tick';

export interface MultiSelectChipsProps {
  /** The text field to display in the chip. */
  field: TextField;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** Whether the chip is selected. */
  isSelected: boolean;
  /** The function to call when the chip is clicked. */
  onClick: () => void;
  /** The ID of the chip. */
  id: string;
}

/** A multi-select chip component. */
export default function MultiSelectChips({
  field,
  disabled = false,
  isSelected = false,
  onClick,
  id,
}: MultiSelectChipsProps) {
  const baseClasses = 'flex items-center gap-2 py-1 pl-1 pr-2 transition-colors';
  const borderClasses = disabled
    ? 'border border-border-action-disabled'
    : 'border border-border-action-secondary-default hover:outline hover:outline-1 hover:outline-border-action-secondary-hover active:border-border-action-secondary-press';
  const textClasses = disabled ? 'text-text-action-disabled' : 'text-text-primary';
  const iconClasses = disabled
    ? 'text-icon-action-disabled w-6 h-6'
    : 'w-6 h-6text-icon-action-secondary-default group-hover:text-icon-action-secondary-hover group-active:text-icon-action-secondary-press';
  const focusClasses =
    'focus:outline-none focus:ring-2 focus:ring-border-action-focus focus:ring-offset-2';
  const bgClasses = isSelected
    ? disabled
      ? 'bg-surface-action-disabled'
      : 'bg-surface-action-secondary-default hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
    : '';

  const content = (
    <>
      {isSelected && <Tick className={iconClasses} />}
      <JssText field={field} className={textClasses} />
    </>
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled) {
        onClick();
      }
    }
  };

  return (
    <div
      id={id}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      className={`group ${baseClasses} ${borderClasses} ${textClasses} ${focusClasses} ${bgClasses} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      role="button"
      aria-pressed={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {content}
    </div>
  );
}
