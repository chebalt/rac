import clsx from 'clsx';

export default function Dot({ className = 'bg-muted-dark' }: { className?: string }) {
  return <div className={clsx('text-current w-[0.7em] h-[0.7em] rounded-full', className)} />;
}
