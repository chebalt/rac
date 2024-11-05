import SearchSvg from 'assets/icons/SearchSvg';
import CloseSvg from 'assets/icons/CloseSvg';
import Button from 'src/shared-components/Button';

import clsx from 'clsx';

type FlightSearchBarProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  className?: string;
};

const FlightSearchBar: React.FC<FlightSearchBarProps> = ({
  id,
  value,
  onChange,
  required = false,
  placeholder,
  disabled = false,
  onClick,
  onFocus,
  className,
}) => {
  const handleClearInput = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={clsx(
        'relative flex items-center w-full max-w-[530px] h-[76px] border border-border-action-tertiary-default hover:border-border-action-tertiary-hover hover:shadow-hover active:border-border-action-tertiary-press active:shadow-pressed focus:outline-none focus:shadow-outline',
        className
      )}
    >
      <div className="absolute flex items-center left-6 rtl:right-6 rtl:left-auto">
        <div className="w-6 h-6">{<SearchSvg />}</div>
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className="p-4 pl-14 pr-[170px] pr w-full h-full box-border rtl:pr-14 rtl:pl-[170px]"
        onFocus={onFocus}
      />
      {value && (
        <div
          className="absolute flex items-center cursor-pointer right-32 rtl:left-32 rtl:right-auto"
          onClick={handleClearInput}
        >
          <div className="w-6 h-6">{<CloseSvg />}</div>
        </div>
      )}
      <Button
        variant="primary"
        label="Search"
        className="absolute right-2 !w-[104px] rtl:left-2 rtl:right-auto"
        onClick={onClick}
      />
    </div>
  );
};

export default FlightSearchBar;
