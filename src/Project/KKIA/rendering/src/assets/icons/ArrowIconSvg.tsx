interface ArrowIconSvgProps {
  className?: string;
}

export default function ArrowIconSvg({ className }: ArrowIconSvgProps) {
  return (
    <svg
      className={className}
      width="1.5em"
      height="1.5em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_7460_257)">
        <path
          d="M6.41602 9.30796C6.13987 9.30796 5.91602 9.53182 5.91602 9.80796C5.91602 10.0841 6.13987 10.308 6.41602 10.308V9.30796ZM18.4783 10.1615C18.6736 9.96625 18.6736 9.64967 18.4783 9.45441L15.2963 6.27242C15.1011 6.07716 14.7845 6.07716 14.5892 6.27242C14.394 6.46769 14.394 6.78427 14.5892 6.97953L17.4177 9.80796L14.5892 12.6364C14.394 12.8316 14.394 13.1482 14.5892 13.3435C14.7845 13.5388 15.1011 13.5388 15.2963 13.3435L18.4783 10.1615ZM6.41602 10.308H18.1248V9.30796H6.41602V10.308Z"
          fill="currentColor"
        />
      </g>
      <path
        d="M0.5 9.80957C0.5 9.53343 0.723858 9.30957 1 9.30957H16.5V10.3096H1C0.723858 10.3096 0.5 10.0857 0.5 9.80957Z"
        fill="currentColor"
      />
      <defs>
        <clipPath id="clip0_7460_257">
          <rect width="14" height="8" fill="white" transform="translate(5.5 6)" />
        </clipPath>
      </defs>
    </svg>
  );
}
