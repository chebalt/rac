import { TextField, ImageField, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';

type Tab = {
  fields: {
    Name?: TextField;
    Icon?: ImageField;
    Title?: TextField;
  };
};

interface TabsProps {
  tabs?: Tab[];
  currentTab: number;
  onTabChange: (tabId: number) => void;
}

export default function Tabs({ tabs, currentTab, onTabChange }: TabsProps) {
  return (
    <div className="flex rtl:flex-row-reverse">
      {tabs?.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={clsx(
            'flex items-center px-6 py-3 transition-colors border-b-2',
            'focus:outline-none focus:ring-2 focus:ring-border-action-focus focus:ring-inset focus:ring-offset-8',
            {
              'text-text-action-secondary-default text-body-medium-bold bg-background border-border-action-secondary-default':
                currentTab === index,
              'text-text-secondary text-body-medium-regular border-none bg-background':
                currentTab !== index,
              'hover:text-text-action-secondary-hover hover:bg-surface-action-secondary-hover hover:border-border-action-secondary-hover':
                currentTab !== index,
              'active:text-text-action-secondary-press active:bg-surface-action-secondary-press active:border-border-action-secondary-press':
                currentTab === index,
              'active:text-text-action-tertiary-press active:bg-surface-action-tertiary-press':
                currentTab !== index,
            }
          )}
        >
          {tab?.fields?.Icon && !('value' in tab.fields.Icon) && (
            <JssImage field={tab.fields.Icon} className="mr-2" />
          )}
          <span
            className={clsx(
              {
                'text-text-action-secondary-default text-body-medium-bold': currentTab === index,
                'text-text-secondary text-body-medium-regular': currentTab !== index,
              },
              'px-3.5 py-0.5'
            )}
          >
            {tab?.fields?.Name?.value || tab?.fields?.Title?.value}
          </span>
        </button>
      ))}
    </div>
  );
}
