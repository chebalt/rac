import React, { useRef } from 'react';
import clsx from 'clsx';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled?: boolean;
  className?: string;
  labelSide?: 'left' | 'right';
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  labelSide = 'left',
}) => {
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
          type: 'radio',
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={`flex items-center p-2 box-border  ${
        checked
          ? 'hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press focus:outline-none focus:shadow-outline'
          : 'hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press focus:outline-none focus:shadow-outline'
      } ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="radio"
      aria-checked={checked}
    >
      <label
        htmlFor={id}
        className={`flex gap-2 items-center cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        {labelSide === 'left' && (
          <span
            className={`${
              disabled
                ? 'text-text-action-disabled'
                : checked
                ? 'text-text-primary text-body-normal-bold'
                : 'text-text-secondary text-body-normal-regular'
            }`}
          >
            {label}
          </span>
        )}
        <span
          className={clsx('w-5 h-5 rounded-full border-2 flex items-center justify-center', {
            'border-icon-action-secondary-default hover:border-icon-action-secondary-hover active:border-icon-action-secondary-press':
              checked,
            'border-border-action-tertiary-default hover:border-border-action-tertiary-hover active:border-border-action-tertiary-press':
              !checked,
          })}
        >
          <span
            className={clsx('w-3 h-3 rounded-full', {
              'bg-icon-action-secondary-default hover:bg-icon-action-secondary-hover active:bg-icon-action-secondary-press':
                checked,
            })}
          ></span>
        </span>
        {labelSide === 'right' && (
          <span
            className={`${
              disabled
                ? 'text-text-action-disabled'
                : checked
                ? 'text-text-primary text-body-normal-bold'
                : 'text-text-secondary text-body-normal-regular'
            }`}
          >
            {label}
          </span>
        )}
      </label>
      <input
        ref={inputRef}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`hidden`}
      />
    </div>
  );
};

export default RadioButton;
