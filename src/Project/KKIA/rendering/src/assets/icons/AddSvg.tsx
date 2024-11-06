interface AddSvgProps {
  className?: string;
}

const AddSvg: React.FC<AddSvgProps> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5 2.5C6.99 2.5 2.5 6.99 2.5 12.5C2.5 18.01 6.99 22.5 12.5 22.5C18.01 22.5 22.5 18.01 22.5 12.5C22.5 6.99 18.01 2.5 12.5 2.5ZM16.5 13.25H13.25V16.5C13.25 16.91 12.91 17.25 12.5 17.25C12.09 17.25 11.75 16.91 11.75 16.5V13.25H8.5C8.09 13.25 7.75 12.91 7.75 12.5C7.75 12.09 8.09 11.75 8.5 11.75H11.75V8.5C11.75 8.09 12.09 7.75 12.5 7.75C12.91 7.75 13.25 8.09 13.25 8.5V11.75H16.5C16.91 11.75 17.25 12.09 17.25 12.5C17.25 12.91 16.91 13.25 16.5 13.25Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AddSvg;