import React, { useRef } from 'react';
import clsx from 'clsx';

export interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled?: boolean;
  labelSide?: 'left' | 'right';
  checkType?: 'tick' | 'line';
}

export default function Checkbox({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  labelSide = 'left',
  checkType = 'tick',
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!disabled) {
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value,
          checked: !checked,
          name,
          type: 'checkbox',
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
    }
  };

  return (
    <div
      className={clsx(
        'box-border flex items-center p-4',
        checked
          ? 'hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
          : 'hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press',
        !disabled && 'cursor-pointer',
        'focus:shadow-outline focus:outline-none'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked}
      aria-labelledby={`${id}-label`}
    >
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={clsx(
          'flex items-center gap-2',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        {labelSide === 'left' && (
          <span
            className={clsx(
              disabled
                ? 'text-text-action-disabled'
                : checked
                ? 'text-body-normal-bold text-text-primary'
                : 'text-body-normal-regular text-text-secondary'
            )}
          >
            {label}
          </span>
        )}
        <span
          className={clsx(
            'flex h-5 w-5 items-center justify-center',
            disabled
              ? 'border-2 border-border-action-disabled'
              : checked
              ? 'bg-icon-action-secondary-default hover:bg-icon-action-secondary-hover active:bg-icon-action-secondary-press'
              : 'border-2 border-border-action-tertiary-default',
            !disabled && !checked && 'cursor-pointer hover:border-border-action-tertiary-hover'
          )}
        >
          {checked && checkType === 'tick' && (
            <svg
              className={clsx(
                'text-surface-primary',
                disabled && 'text-surface-on-action-disabled'
              )}
              width="15"
              height="10"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6L5.84278 11L15.5455 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {checked && checkType === 'line' && (
            <svg
              className={clsx(
                'text-surface-primary',
                disabled && 'text-surface-on-action-disabled'
              )}
              width="13"
              height="2"
              viewBox="0 0 15 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="15" height="2" fill="currentColor" />
            </svg>
          )}
        </span>
        {labelSide === 'right' && (
          <span
            className={clsx(
              disabled
                ? 'text-text-action-disabled'
                : checked
                ? 'text-body-normal-bold text-text-primary'
                : 'text-body-normal-regular text-text-secondary'
            )}
          >
            {label}
          </span>
        )}
      </label>
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}
