import React from 'react';

interface DocumentIconSvgProps {
  className?: string;
}

export default function DocumentIconSvg({ className }: DocumentIconSvgProps) {
  return (
    <svg
      className={className}
      width="24px"
      height="24px"
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.35449 19.8164V1.72266H16.6259V17.3222C16.6307 18.6534 16.6401 19.9894 16.6449 21.3206"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
      <path
        d="M1.35449 18.2786V22.7527H16.6449V20.3739"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
      <path
        d="M3.95605 9.12109H13.9667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
      <path
        d="M3.95605 6.12109H13.9667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
      <path
        d="M3.95605 12.1211H13.9667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
      <path
        d="M3.95605 15.1211H11.9229"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
