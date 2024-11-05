import React, { useRef } from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  labelSide?: 'left' | 'right';
  checkType?: 'tick' | 'line';
  error?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  labelSide,
  checkType = 'tick',
  error = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event);
    }
  };

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

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

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
      className={`relative flex items-center box-border w-fit dir-rtl ${
        checked
          ? 'bg-surface-action-secondary-default hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
          : 'hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press'
      } ${className} focus:outline-none focus:shadow-outline`}
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
        className={`flex gap-2 items-center cursor-pointer z-0 ${
          disabled ? 'cursor-not-allowed' : ''
        }`}
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
          className={`min-w-5 h-5 flex items-center justify-center
          ${
            disabled
              ? 'border-2 border-border-action-disabled'
              : checked
              ? 'bg-icon-action-secondary-default hover:bg-icon-action-secondary-hover active:bg-icon-action-secondary-press'
              : 'border-2 border-border-action-tertiary-default'
          }
          ${!disabled && !checked ? 'hover:border-border-action-tertiary-hover' : ''}
        `}
        >
          {checked && checkType === 'tick' && (
            <svg
              className={` text-surface-primary
                ${disabled ? 'text-surface-on-action-disabled' : ''}
              `}
              width="15"
              height="10"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6L5.84278 11L15.5455 1"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {checked && checkType === 'line' && (
            <svg
              className={` text-surface-primary
                ${disabled ? 'text-surface-on-action-disabled' : ''}
              `}
              width="13"
              height="2"
              viewBox="0 0 15 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="15" height="2" fill="#fff" />
            </svg>
          )}
        </span>
        {labelSide === 'right' && (
          <span
            className={`${
              disabled
                ? 'text-text-action-disabled'
                : checked
                ? 'text-text-primary text-body-normal-bold'
                : error
                ? 'text-text-error text-body-normal-regular underline'
                : 'text-text-secondary text-body-normal-regular'
            }`}
          >
            {label}
          </span>
        )}
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleInputChange}
          onClick={handleInputClick}
          disabled={disabled}
          className="w-full h-full absolute opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
};

export default Checkbox;
