import clsx from 'clsx';

interface ArrowInCircleProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function ArrowInCircle({
  className,
  width = '2em',
  height = '2em',
}: ArrowInCircleProps) {
  return (
    <div className={clsx('bg-background rounded-full p-[1.25em] hover:shadow-arrows', className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4297 5.92993L20.4997 11.9999L14.4297 18.0699"
          stroke="#04615C"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 12H20.33"
          stroke="#04615C"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
