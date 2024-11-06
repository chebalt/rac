import Close from '../icons/Close';
import Search from '../icons/Search';
import Button from 'components/atoms/Button';

import clsx from 'clsx';

interface SearchInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  className?: string;
}

export default function SearchInput({
  id,
  value,
  onChange,
  required,
  placeholder,
  disabled,
  onClick,
  onFocus,
  className,
}: SearchInputProps) {
  const handleClearInput = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      <div
        className={clsx(
          'relative flex h-[76px] w-full items-center border border-border-action-tertiary-default hover:border-border-action-tertiary-hover hover:shadow-hover focus:shadow-outline focus:outline-none active:border-border-action-tertiary-press active:shadow-pressed',
          className
        )}
      >
        <div className="absolute left-6 flex items-center">
          <div className="h-6 w-6">{<Search />}</div>
        </div>
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          className="pr box-border h-full w-full p-4 pl-14 pr-[170px]"
          onFocus={onFocus}
        />
        {value && (
          <div
            className="absolute right-32 flex cursor-pointer items-center"
            onClick={handleClearInput}
          >
            <div className="h-6 w-6">{<Close />}</div>
          </div>
        )}
        <Button
          variant="primary"
          label="Search"
          className="absolute right-2 !w-[104px]"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
