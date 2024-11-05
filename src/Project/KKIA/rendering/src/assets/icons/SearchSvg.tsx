interface SearchSvgProps {
  className?: string;
}

const SearchSvg: React.FC<SearchSvgProps> = ({ className }) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.5 22L20.5 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchSvg;
