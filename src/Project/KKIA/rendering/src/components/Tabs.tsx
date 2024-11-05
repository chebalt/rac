import { useState, useEffect, useMemo } from 'react';
import {
  Text as JssText,
  ComponentRendering,
  TextField,
  Placeholder,
  ComponentParams,
  useSitecoreContext,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import DropdownMenu from './ui/inputs/DropdownMenu';
import ChevronDownSvg from 'assets/icons/ChevronUpDown';
import TabSwitcher from './ui/inputs/TabSwitcher';

type NameValue = {
  value: string;
};

type Tab = {
  fields: {
    Name: NameValue;
    Icon: ImageField;
  };
};

interface TabsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields?: {
    Tabs?: Tab[];
  };
}

export const Default = (props: TabsProps): JSX.Element => {
  const Tabs = useMemo(() => props.fields?.Tabs ?? [], [props.fields?.Tabs]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const tabName = Tabs[index].fields.Name.value;
    if (tabName) {
      const formattedTabName = tabName.toLowerCase().replace(/[-\s]/g, '');
      const currentUrl = window.location.href;
      const urlWithoutHash = currentUrl.split('#')[0];
      const urlWithoutParams = urlWithoutHash.split('?')[0];
      const params = currentUrl.includes('?') ? currentUrl.split('?')[1] : '';
      const newUrl = `${urlWithoutParams}#${formattedTabName}${params ? '?' + params : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1).toLowerCase().replace(/[-\s]/g, '');
    const tabIndex = Tabs.findIndex(
      (tab) => tab.fields.Name.value.toLowerCase().replace(/[-\s]/g, '') === hash
    );
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    } else {
      setActiveTab(0);
    }
  }, [Tabs]);

  // Use the Sitecore context to determine if we're in editing mode
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageState === 'edit';

  return (
    <>
      <SectionPaddingWrapper className="py-10 md:hidden">
        <DropdownMenu
          tabs={Tabs}
          activeTabIndex={activeTab}
          onTabClick={handleTabClick}
          labelKey="Title"
          labelFallback="Select Tab"
        />
      </SectionPaddingWrapper>

      <SectionPaddingWrapper className="hidden py-14 md:block">
        <TabSwitcher tabs={Tabs} currentTab={activeTab} onTabChange={handleTabClick} />
      </SectionPaddingWrapper>

      <div className="w-full overflow-hidden">
        {Tabs.length > 0 &&
          (isEditing ? (
            Tabs.map((tab, index) => (
              <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
                <Placeholder
                  name={`kkia-pagecontent-tab-${index}-${props.params.DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
            ))
          ) : (
            <Placeholder
              name={`kkia-pagecontent-tab-${activeTab}-${props.params.DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          ))}
      </div>
    </>
  );
};

export const TabsWithIcon = (props: TabsProps): JSX.Element => {
  const Tabs = useMemo(() => props.fields?.Tabs ?? [], [props.fields?.Tabs]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const tabName = Tabs[index].fields.Name.value;
    if (tabName) {
      const formattedTabName = tabName.toLowerCase().replace(/[-\s]/g, '');
      const currentUrl = window.location.href;
      const urlWithoutHash = currentUrl.split('#')[0];
      const urlWithoutParams = urlWithoutHash.split('?')[0];
      const params = currentUrl.includes('?') ? currentUrl.split('?')[1] : '';
      const newUrl = `${urlWithoutParams}#${formattedTabName}${params ? '?' + params : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  };
  useEffect(() => {
    const hash = window.location.hash.substring(1).toLowerCase().replace(/[-\s]/g, '');
    const tabIndex = Tabs.findIndex(
      (tab) => tab.fields.Name.value.toLowerCase().replace(/[-\s]/g, '') === hash
    );
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  }, [Tabs]);

  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageState === 'edit';

  return (
    <>
      <SectionPaddingWrapper className="py-10 md:hidden">
        <DropdownMenu
          tabs={Tabs}
          activeTabIndex={activeTab}
          onTabClick={handleTabClick}
          labelKey="Title"
          labelFallback="Select Tab"
        />
      </SectionPaddingWrapper>

      <SectionPaddingWrapper className="hidden py-14 md:block">
        <TabSwitcher tabs={Tabs} currentTab={activeTab} onTabChange={handleTabClick} />
      </SectionPaddingWrapper>

      <div className="w-full overflow-x-hidden">
        {Tabs.length > 0 &&
          (isEditing ? (
            Tabs.map((tab, index) => (
              <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
                <Placeholder
                  name={`kkia-pagecontent-tab-${index}-${props.params.DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
            ))
          ) : (
            <Placeholder
              name={`kkia-pagecontent-tab-${activeTab}-${props.params.DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          ))}
      </div>
    </>
  );
};

export const TabsHorizontal = (props: TabsProps): JSX.Element => {
  const Tabs = useMemo(() => props.fields?.Tabs ?? [], [props.fields?.Tabs]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const tabName = Tabs[index].fields.Name.value;
    if (tabName) {
      const formattedTabName = tabName.toLowerCase().replace(/[-\s]/g, '');
      const currentUrl = window.location.href;
      const urlWithoutHash = currentUrl.split('#')[0];
      const urlWithoutParams = urlWithoutHash.split('?')[0];
      const params = currentUrl.includes('?') ? currentUrl.split('?')[1] : '';
      const newUrl = `${urlWithoutParams}#${formattedTabName}${params ? '?' + params : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1).toLowerCase().replace(/[-\s]/g, '');
    const tabIndex = Tabs.findIndex(
      (tab) => tab.fields.Name.value.toLowerCase().replace(/[-\s]/g, '') === hash
    );
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  }, [Tabs]);

  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageState === 'edit';

  return (
    <>
      <SectionPaddingWrapper className="py-10 md:hidden">
        <DropdownMenu
          tabs={Tabs}
          activeTabIndex={activeTab}
          onTabClick={handleTabClick}
          labelKey="Title"
          labelFallback="Select Tab"
        />
      </SectionPaddingWrapper>

      <SectionPaddingWrapper className="hidden py-14 md:block">
        <div className="flex flex-col">
          {Tabs.length === 0 ? (
            <p>No tabs available</p>
          ) : (
            Tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab-title flex items-center font-bold justify-between text-lg py-4 px-6 cursor-pointer ${
                  activeTab === index ? 'tab-active' : ''
                }`}
                onClick={() => handleTabClick(index)}
              >
                <div className="flex items-center gap-4 text-lg font-bold">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: tab?.fields?.Icon?.value ?? '',
                    }}
                  />
                  <JssText field={tab.fields.Name} />
                </div>
                <ChevronDownSvg />
              </div>
            ))
          )}
        </div>
      </SectionPaddingWrapper>

      <div className="w-full overflow-x-hidden">
        {Tabs.length > 0 &&
          (isEditing ? (
            Tabs.map((tab, index) => (
              <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
                <Placeholder
                  name={`kkia-pagecontent-tab-${index}-${props.params.DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
            ))
          ) : (
            <Placeholder
              name={`kkia-pagecontent-tab-${activeTab}-${props.params.DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          ))}
      </div>
    </>
  );
};
