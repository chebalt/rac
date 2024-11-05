import React from 'react';
import DropdownSelect from './ui/inputs/DropdownSelect';

interface FilterOption {
  id: string;
  options: string[];
  selectedOptions: string[];
  placeholder: string;
  multiple?: boolean;
  onChange: (selected: string[] | string) => void;
}

interface FilterProps {
  filters: FilterOption[];
  showLetterFilter?: boolean;
  availableLetters?: Set<string>;
  selectedLetter?: string;
  onLetterChange?: (letter: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

const Filter = (props: FilterProps): JSX.Element => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex gap-6 mb-8 dir-rtl">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        {props.filters.map((filter) => (
          <div key={filter.id} className="w-full md:min-w-[160px] md:max-w-[180px]">
            <DropdownSelect
              options={filter.options}
              onSelect={(value) => filter.onChange(value)}
              selectedOptions={filter.selectedOptions}
              placeholder={filter.placeholder}
              id={filter.id}
            />
          </div>
        ))}
        <div className="w-full md:min-w-[90px] md:max-w-[90px]">
          <DropdownSelect
            options={['A-Z', 'Z-A']}
            onSelect={(value) =>
              props.onSortOrderChange((value as string) === 'A-Z' ? 'asc' : 'desc')
            }
            selectedOptions={props.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            placeholder="Sort"
            id="sort-order"
            multiple={false}
          />
        </div>
      </div>

      {props.showLetterFilter && props.availableLetters && props.onLetterChange && (
        <div className="hidden md:flex letter-filter w-full flex-1 overflow-x-auto">
          {letters.map((letter) => {
            const hasItems = props.availableLetters?.has(letter);
            return (
              <span
                key={letter}
                className={`flex justify-center items-center font-normal text-lg py-1 px-[6px] ${
                  hasItems ? 'text-muted-darkest' : 'text-muted-primary'
                } ${props.selectedLetter === letter ? 'font-bold underline' : ''}`}
                onClick={() => {
                  if (hasItems) {
                    props.onLetterChange?.(props.selectedLetter === letter ? '' : letter);
                  }
                }}
                style={{ cursor: hasItems ? 'pointer' : 'default' }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;
