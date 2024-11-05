import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface TagProps {
  /** Tag label */
  label: TextField;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Tag variant */
  variant: 'default' | 'invert' | 'error' | 'info' | 'warning' | 'success';
  /** Tag size */
  size: 'small' | 'medium' | 'large';
}

const variantClasses = {
  default: 'bg-surface-secondary text-action-secondary-default text-icon-action-secondary-default',
  invert: 'bg-surface-secondary-invert text-text-invert text-icon-invert',
  error: 'bg-surface-error text-text-error text-icon-error',
  info: 'bg-surface-info text-text-info text-icon-info',
  warning: 'bg-surface-warning text-text-warning text-icon-warning',
  success: 'bg-surface-success text-text-success text-icon-success',
};

const sizeClasses = {
  small: 'px-2 py-1 max-h-[24px]',
  medium: 'p-2',
  large: 'px-3 py-2 ',
};

const textSizeClasses = {
  small: 'text-body-small-regular',
  medium: 'text-body-medium-regular',
  large: 'text-body-large-regular',
};

const iconSizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-5 h-5',
  large: 'w-6 h-6',
};

/** Tag component */
export default function Tag({ label, leftIcon, rightIcon, variant, size }: TagProps) {
  return (
    <div className={`inline-flex items-center ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {leftIcon && <div className={`mr-2 ${iconSizeClasses[size]}`}>{leftIcon}</div>}
      <JssText tag="span" className={textSizeClasses[size]} field={label} />
      {rightIcon && <div className={`ml-2 ${iconSizeClasses[size]}`}>{rightIcon}</div>}
    </div>
  );
}
