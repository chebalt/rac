import { useState } from 'react';
import { TextField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

interface TabFields {
  Name?: TextField;
  Icon?: ImageField;
  Title?: TextField;
}

interface Tab {
  fields: TabFields;
}

interface DropdownMenuProps {
  tabs: Tab[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
  labelKey: keyof TabFields;
  labelFallback?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  tabs,
  activeTabIndex,
  onTabClick,
  labelKey,
  labelFallback = 'Select Item',
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleItemClick = (index: number) => {
    onTabClick(index);
    setOpenDropdown(false);
  };

  return (
    <div className="w-full md:hidden">
      <div
        className={`text-text-secondary text-body-normal-regular p-4 border-b cursor-pointer flex w-full justify-between ${
          openDropdown
            ? 'bg-surface-action-tertiary-filled border-border-action-tertiary-filled'
            : 'bg-surface-action-tertiary-default border-border-action-tertiary-default'
        } hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press`}
        onClick={toggleDropdown}
      >
        <p className="text-text-secondary text-body-normal-regular">
          {(() => {
            const value = tabs[activeTabIndex]?.fields[labelKey]?.value;
            if (typeof value === 'string' || typeof value === 'number') {
              return value;
            } else if (
              typeof tabs[activeTabIndex]?.fields.Name?.value === 'string' ||
              typeof tabs[activeTabIndex]?.fields.Name?.value === 'number'
            ) {
              return tabs[activeTabIndex]?.fields.Name?.value;
            } else {
              return labelFallback;
            }
          })()}
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
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`text-body-normal-regular bg-background text-text-secondary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press p-4 cursor-pointer z-[15] ${
              activeTabIndex === index
                ? 'text-body-normal-bold hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
                : ''
            }`}
            onClick={() => handleItemClick(index)}
          >
            {(() => {
              const value = tab.fields[labelKey]?.value;
              if (typeof value === 'string' || typeof value === 'number') {
                return value;
              } else if (
                typeof tab.fields.Name?.value === 'string' ||
                typeof tab.fields.Name?.value === 'number'
              ) {
                return tab.fields.Name?.value;
              } else {
                return null;
              }
            })()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
