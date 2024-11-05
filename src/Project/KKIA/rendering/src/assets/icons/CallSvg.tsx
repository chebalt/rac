interface CallSvgProps {
  className?: string;
}

export default function CallSvg({ className }: CallSvgProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z"
        fill="currentColor"
      />
      <path
        d="M21.9716 18.33C21.9716 18.61 21.9216 18.9 21.8216 19.18C21.7916 19.26 21.7616 19.34 21.7216 19.42C21.5516 19.78 21.3316 20.12 21.0416 20.44C20.5516 20.98 20.0116 21.37 19.4016 21.62C19.3916 21.62 19.3816 21.63 19.3716 21.63C18.7816 21.87 18.1416 22 17.4516 22C16.4316 22 15.3416 21.76 14.1916 21.27C13.0416 20.78 11.8916 20.12 10.7516 19.29C10.3616 19 9.97156 18.71 9.60156 18.4L12.8716 15.13C13.1516 15.34 13.4016 15.5 13.6116 15.61C13.6616 15.63 13.7216 15.66 13.7916 15.69C13.8716 15.72 13.9516 15.73 14.0416 15.73C14.2116 15.73 14.3416 15.67 14.4516 15.56L15.2116 14.81C15.4616 14.56 15.7016 14.37 15.9316 14.25C16.1616 14.11 16.3916 14.04 16.6416 14.04C16.8316 14.04 17.0316 14.08 17.2516 14.17C17.4716 14.26 17.7016 14.39 17.9516 14.56L21.2616 16.91C21.5216 17.09 21.7016 17.3 21.8116 17.55C21.9116 17.8 21.9716 18.05 21.9716 18.33Z"
        fill="currentColor"
      />
    </svg>
  );
}
