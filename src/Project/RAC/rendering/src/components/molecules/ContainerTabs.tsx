'use client';

import { useState, useEffect, useMemo, ReactNode } from 'react';
import Tabs from '../atoms/Tabs';
import DropdownMenu from '../atoms/DropdownMenu';
import TabContent from '../atoms/TabContent';
import Container from '../atoms/Container';
import { useTabNameAnchor } from '../../lib/useTabNameAnchor';

export interface ITab {
  id: number;
  label: string;
  component: ReactNode;
}

interface IProps {
  tabs: ITab[];
}

export default function ContainerTabs(props: IProps) {
  const tabs = useMemo(() => props.tabs, [props.tabs]);

  const [currentTab, setCurrentTab] = useState(() => 0);
  const { getInitialTab } = useTabNameAnchor(tabs);

  useEffect(() => {
    const initialTab = getInitialTab();
    setCurrentTab(initialTab);
  }, [getInitialTab]);

  const handleTabChange = (newTab: number) => {
    setCurrentTab(newTab);
    if (typeof window !== 'undefined') {
      const hashValue = tabs[newTab].label.toLowerCase().replace(/\s+/g, '-');
      window.location.hash = hashValue;
    }
  };

  const renderTabContent = (currentTab: number) => {
    const selectedTab = tabs[currentTab];
    return selectedTab ? selectedTab.component : null;
  };

  return (
    <>
      <Container className="py-14">
        <div className="hidden md:block">
          <Tabs tabs={tabs} currentTab={currentTab} onTabChange={handleTabChange} />
        </div>
        <div className="md:hidden">
          <DropdownMenu tabs={tabs} currentTab={currentTab} onTabChange={handleTabChange} />
        </div>
      </Container>
      <TabContent>{renderTabContent(currentTab)}</TabContent>
    </>
  );
}
