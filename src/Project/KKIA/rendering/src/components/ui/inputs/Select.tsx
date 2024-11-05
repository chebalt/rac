import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import DangerIconSvg from 'assets/icons/DangerIconSvg';

interface TabFields {
  [key: string]: TextField;
}

interface Tab {
  fields?: TabFields;
  displayName?: string;
}

interface SelectProps {
  tabs: Tab[];
  value: string | number | null;
  onTabClick: (value: string | number) => void;
  labelFallback?: string;
  placeholder?: string;
  required?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  id: string;
  label?: string;
  error?: boolean;
  supportingText?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  tabs,
  value,
  onTabClick,
  labelFallback = 'Select Item',
  placeholder,
  required = false,
  isOpen,
  onToggle,
  id,
  label,
  error = false,
  supportingText,
  disabled = false,
  icon,
}) => {
  const handleItemClick = (index: number) => {
    const value = tabs[index]?.fields?.Value?.value;
    if (value) {
      onTabClick(value);
      if (onToggle) onToggle();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (onToggle) onToggle();
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleItemClick(index);
    }
  };

  return (
    <div className="w-full">
      <label className="w-full flex flex-col gap-1" htmlFor={id}>
        {label && (
          <p
            className={`text-text-primary text-body-small-regular ${
              error ? 'text-text-error' : ''
            }`}
          >
            {label} <span className="text-text-error">{required && '*'}</span>
          </p>
        )}
        <div className="w-full relative">
          <div
            className={`text-text-secondary relative text-body-normal-regular p-4 ${
              icon ? 'pl-12' : ''
            } border-b cursor-pointer flex w-full justify-between ${
              isOpen
                ? 'bg-surface-action-tertiary-filled border-border-action-tertiary-filled'
                : 'bg-surface-action-tertiary-default border-border-action-tertiary-default'
            } hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press
            ${
              error ? 'border-border-error bg-surface-error' : ''
            } focus:outline-none focus:shadow-outline`}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
          >
            {icon && (
              <div className="absolute left-4 w-6 h-6 text-icon-secondary fill-icon-secondary">
                {icon}
              </div>
            )}
            <p className="text-text-secondary text-body-normal-regular">
              {value === null
                ? placeholder
                : tabs.find((tab) => tab.fields?.Value?.value === value)?.displayName ||
                  labelFallback}
            </p>
            <img
              className={`chevron-down w-5 h-5 ml-2 ${isOpen ? 'hidden' : ''}`}
              src="/icons/chevron-down.svg"
              alt="Expand"
            />
            <img
              className={`chevron-up w-5 h-5 ml-2 ${isOpen ? '' : 'hidden'}`}
              src="/icons/chevron-up.svg"
              alt="Collapse"
            />
          </div>

          <div
            className={`absolute bg-background-dark w-full shadow-pressed z-[15] max-h-[336px] overflow-y-auto ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`text-body-normal-regular bg-background text-text-secondary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press p-4 cursor-pointer z-[15] h-[56px] ${
                  value === tab.fields?.Value?.value
                    ? 'text-body-normal-bold hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
                    : ''
                }`}
                onClick={() => handleItemClick(index)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                tabIndex={0}
              >
                {tab.displayName || 'No value'}
              </div>
            ))}
          </div>
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

export default Select;
