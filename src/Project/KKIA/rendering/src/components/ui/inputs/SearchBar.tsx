import SearchSvg from 'assets/icons/SearchSvg';
import CloseSvg from 'assets/icons/CloseSvg';

type SearchBarProps = {
  id: string;
  type: 'text';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  leftIcon?: React.ReactNode;
  imgAltText?: string;
  placeholder?: string;
  supportingText?: string;
  disabled?: boolean;
  error?: boolean;
  onFocus?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  id,
  type,
  value,
  onChange,
  leftIcon,
  required = false,
  placeholder,
  disabled = false,
  error = false,
  onFocus,
}) => {
  const clearSearch = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <label className="w-full flex flex-col gap-1" htmlFor={id}>
      <div className="relative flex items-center w-full h-14">
        {leftIcon && (
          <div className="absolute left-4 flex items-center">
            <div className="w-6 h-6">{leftIcon}</div>
          </div>
        )}
        <input
          className={`p-4 w-full h-14 box-border rtl:text-right rtl:pr-12 ${
            leftIcon ? 'pl-12 rtl:pr-12' : ''
          }bg-surface-action-tertiary-default hover:bg-surface-action-tertiary-hover 
            active:bg-surface-action-tertiary-press disabled:bg-surface-action-disabled 
            border-b border-border-action-tertiary-default hover:border-border-action-tertiary-hover 
            active:border-border-action-tertiary-press placeholder:text-text-secondary 
            text-text-primary text-body-normal-regular placeholder:text-body-normal-regular
            focus:outline-none focus:shadow-outline ${
              error ? 'border-border-error bg-surface-error' : ''
            }`}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          disabled={disabled}
          onFocus={onFocus}
        />

        <div className="absolute right-4 flex items-center rtl:left-4">
          <div className="w-6 h-6">
            {value ? (
              <span onClick={clearSearch}>
                <CloseSvg />
              </span>
            ) : (
              <SearchSvg />
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default SearchBar;
