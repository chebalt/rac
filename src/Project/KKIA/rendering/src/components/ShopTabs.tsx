import { useState } from 'react';
import {
  ComponentRendering,
  TextField,
  Placeholder,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import DropdownMenu from './ui/inputs/DropdownMenu';
import TabSwitcher from './ui/inputs/TabSwitcher';

type ShopTab = {
  fields: {
    Title: TextField;
  };
};

interface ShopTabsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields?: {
    Shops?: ShopTab[];
  };
}

const ShopTabs = (props: ShopTabsProps): JSX.Element => {
  const shopTabs = props.fields?.Shops ?? [];
  const [activeTab, setActiveTab] = useState<number>(0);

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleTabClick = (index: number) => {
    if (activeTab !== index) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SectionPaddingWrapper className="py-14 max-xl:py-10 md:hidden">
        <DropdownMenu
          tabs={shopTabs}
          activeTabIndex={activeTab}
          onTabClick={handleTabClick}
          labelKey="Title"
          labelFallback="Select Tab"
        />
      </SectionPaddingWrapper>

      <SectionPaddingWrapper className="max-md:hidden my-14">
        <TabSwitcher tabs={shopTabs} currentTab={activeTab} onTabChange={handleTabClick} />
      </SectionPaddingWrapper>

      <div className={`tab-content ${isTransitioning ? 'tab-content-hidden' : ''}`}>
        {shopTabs.length > 0 && (
          <Placeholder
            name={`kkia-pagecontent-shoptab-${activeTab}-${props.params.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        )}
      </div>
    </div>
  );
};

export default ShopTabs;
