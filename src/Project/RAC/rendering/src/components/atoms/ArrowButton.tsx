import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import clsx from 'clsx';
import ArrowRight from '../icons/ArrowRight';

interface ArrowButtonProps {
  /** Link field */
  field?: LinkField;
  /** Direction */
  direction: 'left' | 'right' | 'down' | 'up' | 'down-right' | 'down-left' | 'up-right' | 'up-left';
  /** Optional click handler */
  onClick?: () => void;
  /** Size */
  size: 'small' | 'large';
  /** Additional class names */
  buttonClassName?: string;
  /** URL */
  url?: string;
}

/** Secondary UI component for user interaction */
export default function ArrowButton({
  field,
  direction,
  onClick,
  size,
  buttonClassName,
  url,
}: ArrowButtonProps) {
  const outerDivSize = size === 'small' ? 'w-12 h-12' : 'w-20 h-20';
  const arrowSize = size === 'small' ? 'h-6 w-6' : 'h-7 w-7';
  const commonClassName =
    'cursor-pointer bg-surface-primary shadow-blur-soft hover:shadow-blur-hover active:shadow-blur-rough focus:shadow-outline rounded-full flex items-center justify-center';

  const rotationDegrees = {
    left: 180,
    right: 0,
    down: 90,
    up: 270,
    'down-right': 45,
    'down-left': 135,
    'up-right': 315,
    'up-left': 225,
  }[direction];

  if (url) {
    return (
      <NextLink
        href={url}
        className={clsx(commonClassName, outerDivSize, buttonClassName)}
        style={{ transform: `rotate(${rotationDegrees}deg)` }}
      >
        <ArrowRight className={arrowSize} />
      </NextLink>
    );
  }

  if (field) {
    return (
      <Link field={field} className={clsx(commonClassName, outerDivSize, buttonClassName)}>
        <ArrowRight className={arrowSize} />
      </Link>
    );
  }

  return (
    <button
      id="arrow-button"
      aria-label="Arrow"
      className={clsx(commonClassName, outerDivSize, buttonClassName)}
      onClick={onClick}
      style={{ transform: `rotate(${rotationDegrees}deg)` }}
    >
      <ArrowRight className={arrowSize} />
    </button>
  );
}
