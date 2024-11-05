import React, { useState, useEffect } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SearchBar from './ui/inputs/SearchBar';

interface TerminalFields {
  fields?: {
    Name?: {
      value?: string;
    };
  };
}

interface TerminalsFields {
  Terminals: Array<TerminalFields>;
}

export type TransportSearchAndFilterFields = TerminalsFields;

export interface TransportSearchAndFilterProps {
  rendering: ComponentRendering;
  fields: TransportSearchAndFilterFields;
  onFilterChange?: (filters: { searchTerm: string; selectedTerminal: string }) => void;
}

const getNestedFieldValue = (field: { value?: string } | undefined): string => {
  return field?.value || '';
};

const noop = () => {
  console.log('No transport services to filter');
};

const TransportSearchAndFilter = (props: TransportSearchAndFilterProps): JSX.Element => {
  const { t } = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerminal, setSelectedTerminal] = useState('terminal-all');
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleTerminalChange = (terminalId: string) => {
    setSelectedTerminal(terminalId);
    setOpenDropdown(false);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    (props.onFilterChange || noop)({
      searchTerm,
      selectedTerminal,
    });
  }, [searchTerm, selectedTerminal, props]);

  const terminals = props.fields.Terminals || [];

  return (
    <div className="pt-10 md:pt-14 pb-10">
      <div className="md:flex justify-between w-full dir-rtl">
        <div className="w-full md:max-w-[419px]">
          <SearchBar
            placeholder={t('transportsearchandfilter-search')}
            value={searchTerm}
            onChange={handleSearchTermChange}
            id="transport-search"
            type="text"
          />
        </div>

        <div className="filter-terminals h-14 md:hidden">
          <div
            className={`text-text-secondary text-body-normal-regular p-4 border-b cursor-pointer flex w-full justify-between ${
              openDropdown
                ? 'bg-surface-action-tertiary-filled border-border-action-tertiary-filled'
                : 'bg-surface-action-tertiary-default border-border-action-tertiary-default'
            } hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press`}
            onClick={toggleDropdown}
          >
            <p className="text-text-secondary text-body-normal-regular">
              {terminals.find((_, idx) => `terminal-${idx}` === selectedTerminal)?.fields?.Name
                ?.value || t('transportsearchandfilter-all')}
            </p>
            <img
              className={`chevron-down w-5 h-5 ml-2 ${openDropdown ? 'hidden' : ''}`}
              src="/icons/chevron-down.svg"
              alt="Expand"
            />
            <img
              className={`chevron-up w-5 h-5 ml-2 ${openDropdown ? '' : 'hidden'}`}
              src="/icons/chevron-up.svg"
              alt="Collapse"
            />
          </div>

          <div
            className={`absolute bg-background-dark w-[90%] shadow-pressed z-[15] ${
              openDropdown ? 'block' : 'hidden'
            }`}
          >
            <div
              className={`text-body-normal-regular bg-background text-text-secondary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press p-4 cursor-pointer z-[15] ${
                selectedTerminal === 'terminal-all'
                  ? 'text-body-normal-bold hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
                  : ''
              }`}
              onClick={() => handleTerminalChange('terminal-all')}
            >
              {t('transportsearchandfilter-all')}
            </div>
            {terminals.map((terminal, idx) => {
              const fieldValue = getNestedFieldValue(terminal.fields?.Name);

              return (
                <div
                  key={fieldValue}
                  className={`text-body-normal-regular bg-background text-text-secondary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press p-4 cursor-pointer z-[15] ${
                    selectedTerminal === fieldValue
                      ? 'text-body-normal-bold hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
                      : ''
                  }`}
                  onClick={() => handleTerminalChange(fieldValue)}
                >
                  {getNestedFieldValue(terminal.fields?.Name)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="filter-list border border-jade-light hidden md:flex h-14">
          <input
            type="button"
            id="terminal-all"
            value={t('transportsearchandfilter-all')}
            onClick={() => handleTerminalChange('terminal-all')}
            className={`filter-item px-6 h-14 flex justify-center items-center text-sm font-bold cursor-pointer ${
              selectedTerminal === 'terminal-all' ? 'bg-jade-light' : ''
            }`}
          />

          {terminals.map((terminal, idx) => {
            const fieldValue = getNestedFieldValue(terminal.fields?.Name);

            return (
              <input
                type="button"
                id={fieldValue}
                value={fieldValue}
                onClick={() => handleTerminalChange(fieldValue)}
                key={fieldValue}
                className={`filter-item px-6 h-14 flex justify-center items-center text-sm font-bold cursor-pointer ${
                  selectedTerminal === fieldValue ? 'bg-jade-light' : ''
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransportSearchAndFilter;
