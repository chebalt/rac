import clsx from 'clsx';

interface Tab {
  id: number;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  currentTab: number;
  onTabChange: (tabId: number) => void;
}

export default function Tabs({ tabs, currentTab, onTabChange }: TabsProps) {
  return (
    <div className="flex">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(index)}
          className={clsx(
            'flex items-center border-b-2 px-6 py-3 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-border-action-focus focus:ring-offset-8',
            {
              'text-body-medium-bold border-border-action-secondary-default bg-background text-text-action-secondary-default':
                currentTab === index,
              'text-body-medium-regular border-none bg-background text-text-secondary':
                currentTab !== index,
              'hover:text-text-action-secondary-hover hover:border-border-action-secondary-hover hover:bg-surface-action-secondary-hover':
                currentTab !== index,
              'active:text-text-action-secondary-press active:border-border-action-secondary-press active:bg-surface-action-secondary-press':
                currentTab === index,
              'active:text-text-action-tertiary-press active:bg-surface-action-tertiary-press':
                currentTab !== index,
            }
          )}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          <span
            className={clsx(
              {
                'text-body-medium-bold text-text-action-secondary-default': currentTab === index,
                'text-body-medium-regular text-text-secondary': currentTab !== index,
              },
              'px-3.5 py-0.5'
            )}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
