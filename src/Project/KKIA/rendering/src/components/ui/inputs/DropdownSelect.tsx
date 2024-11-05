import { useEffect, useRef, useState } from 'react';
import ChevronDownSvg from 'assets/icons/ChevronUpDown';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';
import Checkbox from '../checkbox/Checkbox';

interface DropdownSelectProps {
  options: string[];
  onSelect: (selected: string[] | string) => void;
  selectedOptions: string[] | string | null;
  placeholder?: string;
  id?: string;
  icon?: React.ReactNode;
  multiple?: boolean;
  showAll?: boolean;
}

function DropdownSelect({
  options,
  onSelect,
  selectedOptions,
  placeholder,
  id,
  icon,
  multiple = true,
  showAll = false,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allOptions = showAll ? ['All', ...options] : options;

  const selected =
    multiple && Array.isArray(selectedOptions)
      ? selectedOptions.length > 0
        ? selectedOptions
        : showAll
        ? ['All']
        : []
      : [];

  const handleSelect = (option: string) => {
    if (multiple) {
      if (option === 'All') {
        onSelect(['All']);
      } else {
        let newSelected = Array<string>();
        if (selected.includes(option)) {
          newSelected = selected.filter((item) => item !== option);
          if (newSelected.length === 0 && showAll) {
            newSelected = ['All'];
          }
        } else {
          newSelected = selected.filter((item) => item !== 'All');
          newSelected.push(option);
        }
        onSelect(newSelected);
      }
    } else {
      onSelect(option);
      setOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef} id={id}>
      <button
        className={`h-14 flex items-center justify-between truncate p-4 text-body-normal-regular text-text-secondary w-full bg-surface-action-tertiary-default hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press border-b border-border-action-tertiary-default hover:border-border-action-tertiary-hover active:border-border-action-tertiary-press ${
          icon ? 'pl-12' : ''
        } ${Array.isArray(selectedOptions) && selectedOptions.length ? 'text-text-primary' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {icon && (
          <div className="flex items-center justify-center w-6 h-6 text-icon-secondary fill-icon-secondary">
            {icon}
          </div>
        )}
        {multiple ? (
          selected.length > 0 && !selected.includes('All') ? (
            <div className="truncate">{selected.join(', ')}</div>
          ) : (
            placeholder || 'Select options'
          )
        ) : (
          <div className="truncate">{selectedOptions || placeholder || 'Select an option'}</div>
        )}
        {open ? (
          <ChevronUpSvg className="min-w-6 h-6" />
        ) : (
          <ChevronDownSvg className="min-w-6 h-6" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full z-50 shadow-pressed bg-surface-primary max-h-[336px] overflow-x-hidden overflow-y-auto timepicker-scroll">
          {allOptions.map((option, index) => (
            <div key={index}>
              {multiple ? (
                <Checkbox
                  checked={selected.includes(option)}
                  onChange={() => handleSelect(option)}
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  labelSide="right"
                  label={option}
                  className="p-4 w-full cursor-pointer"
                />
              ) : (
                <button
                  className={`flex items-center justify-between p-4 w-full text-body-normal-regular ${
                    selectedOptions === option
                      ? 'text-text-primary bg-surface-action-secondary-default hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
                      : 'text-text-secondary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press'
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSelect;
