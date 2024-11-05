import { IconProps } from 'src/types/global';

export default function ChevronRight({ className }: IconProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.69053 17C9.51501 17 9.33949 16.9391 9.20092 16.8087C8.93303 16.5564 8.93303 16.1389 9.20092 15.8867L13.3303 11.9989L9.20092 8.11111C8.93303 7.85888 8.93303 7.4414 9.20092 7.18917C9.46882 6.93694 9.91224 6.93694 10.1801 7.18917L14.7991 11.5379C15.067 11.7902 15.067 12.2077 14.7991 12.4599L10.1801 16.8087C10.0416 16.9391 9.86605 17 9.69053 17Z"
        fill="#1F619B"
      />
    </svg>
  );
}
