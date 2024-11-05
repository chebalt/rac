import Indicator from '../atoms/Indicator';

export interface IndicatorsGroupProps {
  /** The number of indicators to display */
  count: number;
  /** The onClick handler for the indicators */
  onClick: (index: number) => void;
  /** The index of the active indicator */
  activeIndex: number;
  /** The progress of the active indicator */
  progress: number;
}

/**
 * A component that displays a group of indicators
 */
export default function IndicatorsGroup({
  count,
  onClick,
  activeIndex,
  progress,
}: IndicatorsGroupProps) {
  return (
    <div className="flex gap-4 p-5">
      {Array.from({ length: count }, (_, index) => (
        <Indicator
          key={index}
          id={`indicator-${index}`}
          isActive={index === activeIndex}
          onClick={() => onClick(index)}
          progress={index === activeIndex ? progress : 0}
        />
      ))}
    </div>
  );
}
