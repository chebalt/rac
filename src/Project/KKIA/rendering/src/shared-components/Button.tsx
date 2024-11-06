import { LinkField, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
import CustomLink from './CustomLink';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: string;
  className?: string;
  leftIcon?: React.ReactNode | ImageField;
  rightIcon?: React.ReactNode | ImageField;
  field?: LinkField;
  url?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string | number;
  type?: 'button' | 'submit';
  defaultUnderline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'default',
  className,
  leftIcon,
  rightIcon,
  field,
  url,
  onClick,
  disabled,
  label,
  type = 'button',
  defaultUnderline,
}) => {
  const commonClassName =
    'flex items-center justify-center gap-2 w-full md:w-fit transition-all duration-200 rtl:flex-row-reverse';
  const sizeClassName =
    variant === 'tertiary'
      ? size === 'small'
        ? 'py-3 px-0 text-body-small-bold'
        : 'py-4 px-0 text-body-medium-bold'
      : size === 'small'
      ? 'py-3 px-4 text-body-small-bold'
      : 'py-4 px-6 text-body-medium-bold';

  size === 'small' ? 'py-3 px-4 text-body-small-bold' : 'py-4 px-6 text-body-medium-bold';
  const iconSize = size === 'small' ? 'h-4 w-4' : 'h-6 w-6';

  let variantClassName = '';
  switch (variant) {
    case 'primary':
      variantClassName = clsx(
        variantClassName,
        disabled
          ? 'text-text-action-disabled bg-surface-action-disabled cursor-not-allowed'
          : 'text-text-action-primary bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press focus:outline-none focus:shadow-outline'
      );
      break;
    case 'secondary':
      variantClassName = clsx(
        variantClassName,
        disabled
          ? 'text-text-action-disabled bg-surface-action-disabled border-2 border-text-action-disabled cursor-not-allowed'
          : 'text-text-action-secondary-default bg-surface-action-secondary-default border-2 border-border-action-primary-default hover:bg-surface-action-secondary-hover hover:border-border-action-secondary-hover active:bg-surface-action-secondary-press active:border-border-action-secondary-press focus:outline-none focus:shadow-outline'
      );
      break;
    case 'tertiary':
      variantClassName = clsx(
        variantClassName,
        disabled
          ? 'p-0 pb-1 text-text-action-disabled border-b-2 border-border-action-disabled cursor-not-allowed'
          : 'p-0 pb-1 text-text-action-secondary-default border-b-2 hover:text-text-action-secondary-hover hover:border-border-action-secondary-hover active:text-text-action-secondary-press active:border-border-action-secondary-press focus:outline-none focus:shadow-outline',
        defaultUnderline ? 'border-primary-dark-green hover:opacity-50' : 'border-transparent'
      );
      break;
  }

  const renderIcon = (icon: React.ReactNode | ImageField | null | undefined): React.ReactNode => {
    if (!icon) return null;
    if (typeof icon === 'object' && 'value' in icon) {
      const hasIconSrc = icon.value && 'src' in icon.value;
      return (
        hasIconSrc && (
          <span className={clsx('flex items-center', iconSize)}>
            <Image field={icon as ImageField} />
          </span>
        )
      );
    }
    return icon as React.ReactNode;
  };

  const button = (
    <button
      className={clsx(commonClassName, sizeClassName, variantClassName, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {renderIcon(leftIcon)}
      {field ? field.value.text : label}
      {renderIcon(rightIcon)}
    </button>
  );

  if (onClick) {
    return button;
  }

  return (
    <CustomLink field={field} url={url}>
      {button}
    </CustomLink>
  );
};

export default Button;
