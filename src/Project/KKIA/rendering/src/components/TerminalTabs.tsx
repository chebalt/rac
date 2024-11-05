import React, { useState } from 'react';
import {
  Text as JssText,
  ComponentRendering,
  TextField,
  Placeholder,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import DropdownMenu from './ui/inputs/DropdownMenu';

type TerminalTab = {
  fields: {
    Name: TextField;
  };
};

interface TerminalTabsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields?: {
    Title: TextField;
    Tabs?: TerminalTab[];
    Description: TextField;
  };
}

const TerminalTabs = (props: TerminalTabsProps): JSX.Element => {
  const terminalTabs = props.fields?.Tabs ?? [];
  const [selectedTerminal, setSelectedTerminal] = useState<string>('terminal-0');

  const handleTerminalChange = (terminalId: string) => {
    setSelectedTerminal(terminalId);
  };

  return (
    <SectionPaddingWrapper className="pb-10 pt-14 max-xl:py-10">
      <div className="flex flex-col gap-4 mb-10">
        <JssText tag="h3" className="font-bold text-jade-darkest " field={props.fields?.Title} />
        <JssText
          tag="p"
          className="font-light text-muted-darker"
          field={props.fields?.Description}
        />
      </div>

      <DropdownMenu
        tabs={terminalTabs}
        activeTabIndex={terminalTabs.findIndex((_, idx) => `terminal-${idx}` === selectedTerminal)}
        onTabClick={(index) => handleTerminalChange(`terminal-${index}`)}
        labelKey="Name"
        labelFallback="Select Terminal"
      />

      <div className="hidden md:flex border border-jade-dark w-full dir-rtl">
        {terminalTabs.length === 0 ? (
          <p>No tabs available</p>
        ) : (
          terminalTabs.map((tab, index) => (
            <div
              key={index}
              className={`terminal-tab-title flex-grow cursor-pointer hover:bg-jade-dark flex justify-center items-center py-4 text-sm ${
                selectedTerminal === `terminal-${index}`
                  ? 'bg-jade-light text-primary-dark-green font-bold'
                  : 'bg-background text-muted-darker font-normal'
              }`}
              onClick={() => handleTerminalChange(`terminal-${index}`)}
            >
              <JssText field={tab.fields.Name} />
            </div>
          ))
        )}
      </div>

      <div>
        {terminalTabs.length === 0 ? (
          <p>No tabs available</p>
        ) : (
          terminalTabs.map((_, index) => {
            const phKey = `kkia-pagecontent-terminaltab-${index}-${props.params.DynamicPlaceholderId}`;
            console.log(phKey);
            return (
              <div
                key={`terminal-${index}`}
                className={`terminal-tab-content ${
                  selectedTerminal === `terminal-${index}` ? 'block' : 'hidden'
                }`}
              >
                <Placeholder name={phKey} rendering={props.rendering} />
              </div>
            );
          })
        )}
      </div>
    </SectionPaddingWrapper>
  );
};

export default TerminalTabs;
