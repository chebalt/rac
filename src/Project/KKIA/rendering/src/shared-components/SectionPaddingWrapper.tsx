import clsx from 'clsx';
import { ReactNode } from 'react';

const SectionPaddingWrapper = ({
  children,
  className,
  childrenClass,
}: {
  children: ReactNode;
  className?: HTMLElement['className'];
  childrenClass?: HTMLElement['className'];
}) => {
  return (
    <div className={clsx('w-full', className)}>
      <div className={`${childrenClass} w-[90%] xl:w-full max-w-[1320px] mx-auto`}>{children}</div>
    </div>
  );
};

export default SectionPaddingWrapper;
