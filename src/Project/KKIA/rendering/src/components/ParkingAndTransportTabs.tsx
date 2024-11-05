import React, { useState } from 'react';
import {
  Text as JssText,
  ComponentRendering,
  TextField,
  Placeholder,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import DropdownMenu from './ui/inputs/DropdownMenu';
import TabSwitcher from './ui/inputs/TabSwitcher';

type ParkingAndTransportTab = {
  fields: {
    Name: TextField;
  };
};

interface ParkingTabsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields?: {
    Tabs?: ParkingAndTransportTab[];
  };
}

const ParkingAndTransportTabs = (props: ParkingTabsProps): JSX.Element => {
  const parkingTabs = props.fields?.Tabs ?? [];
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <SectionPaddingWrapper className="py-10 md:hidden">
        <DropdownMenu
          tabs={parkingTabs}
          activeTabIndex={activeTab}
          onTabClick={handleTabClick}
          labelKey="Title"
          labelFallback="Select Tab"
        />
      </SectionPaddingWrapper>

      <SectionPaddingWrapper className="py-14 hidden md:block">
        <TabSwitcher tabs={parkingTabs} currentTab={activeTab} onTabChange={handleTabClick} />
      </SectionPaddingWrapper>

      <div className="w-full overflow-x-hidden">
        {parkingTabs.length > 0 && (
          <Placeholder
            name={`kkia-pagecontent-parkingtab-${activeTab}-${props.params.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        )}
      </div>
    </>
  );
};

export default ParkingAndTransportTabs;
