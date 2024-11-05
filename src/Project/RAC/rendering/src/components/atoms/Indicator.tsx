import clsx from 'clsx';

interface IndicatorProps {
  /** The id of the indicator */
  id: string;
  /** The progress of the indicator */
  progress: number;
  /** Whether the indicator is active */
  isActive: boolean;
  /** The onClick handler for the indicator */
  onClick: () => void;
}

/**
 * A component that displays an indicator as a circle
 */
export default function Indicator({ progress, isActive, onClick }: IndicatorProps) {
  const circleRadius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div
      tabIndex={0}
      className={clsx(
        'relative inline cursor-pointer text-current focus:shadow-outline focus:outline-none',
        isActive
          ? 'border-border-action-secondary-default hover:border-border-action-secondary-hover active:border-border-action-secondary-press'
          : 'border-border-action-tertiary-default hover:border-border-action-tertiary-hover active:border-border-action-tertiary-press'
      )}
      onClick={onClick}
    >
      <svg width="1rem" height="1rem" viewBox="0 0 100 100">
        <circle
          className="stroke-transparent text-transparent"
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={circleRadius}
          fill="transparent"
        ></circle>
        <circle
          className={clsx(
            isActive
              ? 'stroke-border-action-secondary-default text-border-action-secondary-default'
              : 'stroke-transparent text-transparent'
          )}
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={circleRadius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * progress) / 100}
          style={{
            transition: 'stroke-dashoffset 0.35s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={clsx(
            'h-[6px] w-[6px] rounded-full',
            isActive
              ? 'bg-border-action-secondary-default'
              : 'bg-border-action-tertiary-default hover:bg-border-action-tertiary-hover active:bg-border-action-tertiary-press'
          )}
        ></div>
      </div>
    </div>
  );
}
