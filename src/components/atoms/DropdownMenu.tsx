import { useState } from 'react';
import ChevronDown from 'components/icons/ChevronDown';
import clsx from 'clsx';

export interface Tab {
  id: number;
  label: string;
  icon?: React.ReactNode;
}

export interface DropdownMenuProps {
  /** The tabs to display in the dropdown menu, tabs to be passed in as an array of objects with an id and label */
  tabs: Tab[];
  /** The currently selected tab uses index of the tab */
  currentTab: number;
  /** Function needed to switch tabs */
  onTabChange: (tabId: number) => void;
}

/**
 * A component that allows the user to switch between different tabs with each tab having an label
 *
 * It is recommended to manage the currentTab index using state. Use setCurrentTab to update the state and pass it to onTabChange to switch tabs.
 * */
function DropdownMenu({ tabs, currentTab, onTabChange }: DropdownMenuProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleItemClick = (index: number) => {
    onTabChange(index);
    setOpenDropdown(false);
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          'text-body-normal-regular flex w-full cursor-pointer justify-between border-b p-4 text-text-secondary',
          openDropdown
            ? 'bg-surface-action-tertiary-filled border-border-action-tertiary-filled'
            : 'border-border-action-tertiary-default bg-surface-action-tertiary-default',
          'hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press'
        )}
        onClick={toggleDropdown}
      >
        <span className="text-body-normal-regular text-text-secondary">
          {tabs[currentTab].label}
        </span>

        <ChevronDown
          className={clsx(
            'ml-2 h-5 w-5 transition-transform duration-300',
            openDropdown ? 'rotate-180' : ''
          )}
        />
      </div>
      <div
        className={`bg-background-dark absolute z-[15] w-[90%] shadow-pressed ${
          openDropdown ? 'block' : 'hidden'
        }`}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={clsx(
              'text-body-normal-regular z-[15] cursor-pointer bg-background p-4 text-text-secondary',
              currentTab === index
                ? 'text-body-normal-bold hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
                : ''
            )}
            onClick={() => handleItemClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownMenu;
