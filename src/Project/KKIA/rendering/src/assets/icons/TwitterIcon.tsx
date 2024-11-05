interface TwitterIconProps {
  className?: string;
}

export default function TwitterIcon({ className }: TwitterIconProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.64 0.617188H15.09L9.71 6.88261L16 15.3864H11.06L7.19 10.2249L2.76 15.3864H0.32L6.02 8.68149L0 0.617188H5.06L8.55 5.33925L12.64 0.617188ZM11.78 13.9146H13.14L4.35 2.0379H2.89L11.79 13.9146H11.78Z"
        fill="currentColor"
      />
    </svg>
  );
}
