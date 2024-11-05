import { useState, useEffect, useMemo } from 'react';
import {
  ComponentRendering,
  TextField,
  Placeholder,
  ComponentParams,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import TabSwitcher from './ui/inputs/TabSwitcher';

type FlightTab = {
  fields: {
    Title: TextField;
    Icon: ImageField;
  };
};

interface FlightTabsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields?: {
    Tabs?: FlightTab[];
  };
}

const FlightTabs = (props: FlightTabsProps): JSX.Element => {
  const flightTabs = useMemo(() => props.fields?.Tabs ?? [], [props.fields?.Tabs]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1).toLowerCase().replace(/[-\s]/g, '');
    const tabIndex = flightTabs.findIndex(
      (tab) =>
        typeof tab.fields.Title?.value === 'string' &&
        tab.fields.Title.value.toLowerCase().replace(/[-\s]/g, '') === hash
    );
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    } else {
      setActiveTab(0);
    }
  }, [flightTabs]);

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex p-3 mb-8 rtl:justify-end">
        <TabSwitcher tabs={flightTabs} currentTab={activeTab} onTabChange={handleTabClick} />
      </div>
      <div className="tab-content">
        {flightTabs.length > 0 && (
          <Placeholder
            name={`kkia-flights-flighttab-${activeTab}-${props.params.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        )}
      </div>
    </SectionPaddingWrapper>
  );
};

export default FlightTabs;
