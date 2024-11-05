import React from 'react';
import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import DangerIconSvg from 'assets/icons/DangerIconSvg';

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  imgAltText?: string;
  placeholder?: string;
  supportingText?: string;
  disabled?: boolean;
  error?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  value,
  onChange,
  label,
  required = false,
  placeholder,
  supportingText,
  disabled = false,
  error = false,
}) => {
  return (
    <div className="w-full">
      <label className="w-full flex flex-col gap-1" htmlFor={id}>
        <p
          className={`text-text-primary text-body-small-regular ${error ? 'text-text-error' : ''}`}
        >
          {label} <span className="text-text-error">{required && '*'}</span>
        </p>
        <div className="relative flex items-center w-full">
          <textarea
            className={`p-4 w-full box-border bg-surface-action-tertiary-default hover:bg-surface-action-tertiary-hover 
            active:bg-surface-action-tertiary-press disabled:bg-surface-action-disabled 
            border-b border-border-action-tertiary-default hover:border-border-action-tertiary-hover 
            active:border-border-action-tertiary-press placeholder:text-text-secondary 
            text-text-primary text-body-normal-regular placeholder:text-body-normal-regular
            focus:outline-none focus:border-border-action-focus focus:border-[3px] min-h-[129px] ${
              error ? 'border-border-error bg-surface-error' : ''
            }`}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
          />
        </div>
        {supportingText && (
          <div className="flex items-center gap-1">
            {error ? (
              <DangerIconSvg className="text-icon-error" />
            ) : (
              <InfoCircleSvg className="text-icon-secondary" />
            )}
            <p
              className={`text-text-secondary text-body-extra-small-regular ${
                error ? 'text-text-error' : ''
              }`}
            >
              {supportingText}
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default Textarea;
