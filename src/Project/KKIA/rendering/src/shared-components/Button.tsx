import { LinkField, Link, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import clsx from 'clsx';

interface ButtonProps {
  variant: string;
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
}) => {
  const commonClassName =
    'flex items-center justify-center gap-2 w-full md:w-fit transition-all duration-200 rtl:flex-row-reverse';
  const sizeClassName =
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
          : 'p-0 pb-1 text-text-action-secondary-default border-b-2 border-transparent hover:text-text-action-secondary-hover hover:border-border-action-secondary-hover active:text-text-action-secondary-press active:border-border-action-secondary-press focus:outline-none focus:shadow-outline'
      );
      break;
  }

  const renderIcon = (icon: React.ReactNode | ImageField | null | undefined): React.ReactNode => {
    if (!icon) return null;
    if (typeof icon === 'object' && 'value' in icon) {
      return <Image field={icon as ImageField} />;
    }
    return icon as React.ReactNode;
  };

  const renderButtonContent = () => (
    <>
      {leftIcon && <span className={clsx(iconSize)}>{renderIcon(leftIcon)}</span>}
      {field ? field.value.text : label}
      {rightIcon && <span className={clsx(iconSize)}>{renderIcon(rightIcon)}</span>}
    </>
  );

  if (field) {
    return (
      <Link
        field={field}
        className={clsx(commonClassName, sizeClassName, variantClassName, className)}
      >
        {renderButtonContent()}
      </Link>
    );
  }

  if (url) {
    return (
      <NextLink
        href={url}
        className={clsx(commonClassName, sizeClassName, variantClassName, className)}
      >
        {renderButtonContent()}
      </NextLink>
    );
  }

  return (
    <button
      className={clsx(commonClassName, sizeClassName, variantClassName, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {renderButtonContent()}
    </button>
  );
};

export default Button;
