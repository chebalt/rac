export default function ProgressCircle({
  progress,
  dotComponent,
}: {
  progress: number;
  dotComponent: JSX.Element;
}) {
  const circleRadius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * circleRadius;
  return (
    <div className="relative text-current">
      <svg width="1.7em" height="1.7em" viewBox="0 0 100 100">
        <circle
          className="text-transparent stroke-transparent"
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={circleRadius}
          fill="transparent"
        ></circle>
        <circle
          className="text-primary-dark-green stroke-primary-variant"
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={circleRadius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * progress) / 100}
          style={{ transition: 'stroke-dashoffset 0.35s' }}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{dotComponent}</div>
    </div>
  );
}
