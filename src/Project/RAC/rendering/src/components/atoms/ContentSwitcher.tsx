import React from 'react';
import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Tab {
  /** The unique identifier for the tab */
  id: number;
  label: TextField;
  icon?: React.ReactNode;
}

interface ContentSwitcherProps {
  /** The tabs to display in the content switcher, tabs to be passed in as an array of objects with an id, label and optional icon */
  tabs: Tab[];
  /** The currently selected tab uses index of the tab */
  currentTab: number;
  /** Function neede to switch tabs */
  onTabChange: (tabId: number) => void;
}

/**
 * A component that allows the user to switch between different tabs with each tab having an label and optional icon
 *
 * It is recommended to manage the currentTab index using state. Use setCurrentTab to update the state and pass it to onTabChange to switch tabs.
 * */

export default function ContentSwitcher({ tabs, currentTab, onTabChange }: ContentSwitcherProps) {
  const baseClasses = 'px-6 py-4';
  const focusClasses =
    'focus:outline-none focus:ring-2 focus:ring-border-action-focus focus:ring-inset';
  const activeClasses =
    'text-body-small-bold text-text-action-secondary-default bg-surface-action-secondary-default';
  const inactiveClasses = 'text-body-small-regular text-text-secondary bg-background';
  const hoverClasses =
    'hover:text-body-small-regular hover:text-text-secondary hover:bg-surface-action-teritary-hover';
  const activeHoverClasses =
    'hover:text-body-small-bold hover:text-text-action-secondary-hover hover:bg-surface-action-secondary-hover';
  const activePressClasses =
    'active:text-body-small-bold active:text-text-action-secondary-press active:bg-surface-action-secondary-press';
  const inactivePressClasses =
    'active:text-body-small-regular active:text-text-secondary active:bg-surface-action-tertiary-press';

  return (
    <div className="flex w-fit border border-border-primary">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(index)}
          className={` ${baseClasses} ${focusClasses} ${
            currentTab === index ? activeClasses : inactiveClasses
          } ${currentTab === index ? activeHoverClasses : hoverClasses} ${
            currentTab === index ? activePressClasses : inactivePressClasses
          } `}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          <JssText field={tab.label} />
        </button>
      ))}
    </div>
  );
}
