import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import DangerIconSvg from 'assets/icons/DangerIconSvg';
type TextInputProps = {
  id: string;
  type: 'date' | 'time' | 'text' | 'email';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  imgAltText?: string;
  placeholder?: string;
  supportingText?: string;
  disabled?: boolean;
  error?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  value,
  onChange,
  label,
  leftIcon,
  rightIcon,
  required = false,
  placeholder,
  supportingText,
  disabled = false,
  error = false,
}) => {
  return (
    <label className="w-full flex flex-col gap-1" htmlFor={id}>
      <p className={`text-text-primary text-body-small-regular ${error ? 'text-text-error' : ''}`}>
        {label} <span className="text-text-error">{required && '*'}</span>
      </p>
      <div className="relative flex items-center w-full h-14">
        {leftIcon && (
          <div className="absolute left-4 flex items-center">
            <div className="w-6 h-6">{leftIcon}</div>
          </div>
        )}
        <input
          className={`p-4 w-full h-14 box-border ${leftIcon ? 'pl-12' : ''} ${
            rightIcon ? 'pr-12' : ''
          } bg-surface-action-tertiary-default hover:bg-surface-action-tertiary-hover 
            active:bg-surface-action-tertiary-press disabled:bg-surface-action-disabled 
            border-b border-border-action-tertiary-default hover:border-border-action-tertiary-hover 
            active:border-border-action-tertiary-press placeholder:text-text-secondary 
            text-text-primary text-body-normal-regular placeholder:text-body-normal-regular
            focus:outline-none focus:shadow-outline ${
              error ? 'border-border-error bg-surface-error' : ''
            }`}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        {rightIcon && (
          <div className="absolute right-4 flex items-center">
            <div className="w-6 h-6">{rightIcon}</div>
          </div>
        )}
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
  );
};

export default TextInput;
