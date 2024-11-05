import { Text, Field, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';

export default function SectionHeading({
  heading,
  description,
  className,
  isLight,
}: {
  heading: Field<string> | TextField;
  description: Field<string> | TextField;
  className?: HTMLElement['className'];
  isLight?: boolean;
}) {
  return (
    <div className={className}>
      <h2 className={clsx('text-[2rem] font-bold mb-4 ', { 'text-white': isLight })}>
        <Text field={heading} />
      </h2>
      <p className={clsx('text-[1em]', { 'text-white': isLight })}>
        <Text field={description} />
      </p>
    </div>
  );
}
