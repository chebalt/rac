import React, { useState } from 'react';
import {
  Text as JssText,
  Image as JssImage,
  ImageField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import DropdownMenu from './ui/inputs/DropdownMenu';

type StepTab = {
  fields: {
    Name: TextField;
    Text: TextField;
  };
};

interface StepsProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields?: {
    Image: ImageField;
    Tabs?: StepTab[];
  };
}

const Steps = (props: StepsProps): JSX.Element => {
  const stepTabs = props.fields?.Tabs ?? [];
  const [selectedStepTab, setSelectedStepTab] = useState<string>('stepTab-0');

  const handleStepTabChange = (stepTabId: string) => {
    setSelectedStepTab(stepTabId);
  };

  const baseClasses = 'px-6 py-4 flex-grow';
  const focusClasses =
    'focus:outline-none focus:ring-2 focus:ring-border-action-focus focus:ring-inset';
  const activeClasses =
    'text-body-small-bold text-text-action-secondary-default bg-surface-action-secondary-default';
  const inactiveClasses = 'text-body-small-regular text-text-secondary bg-background';
  const hoverClasses =
    'hover:text-body-small-regular hover:text-text-secondary hover:bg-surface-action-tertiary-hover';
  const activeHoverClasses =
    'hover:text-body-small-bold hover:text-text-action-secondary-hover hover:bg-surface-action-secondary-hover';
  const activePressClasses =
    'active:text-body-small-bold active:text-text-action-secondary-press active:bg-surface-action-secondary-press';
  const inactivePressClasses =
    'active:text-body-small-regular active:text-text-secondary active:bg-surface-action-tertiary-press';

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-10 md:flex-row md:gap-24">
        {props.fields?.Image &&
          props.fields.Image.value &&
          Object.keys(props.fields.Image.value).length > 0 && (
            <div className="flex flex-col gap-4 mb-10 md:w-1/2">
              <JssImage field={props.fields.Image} />
            </div>
          )}

        {props.fields?.Image &&
        props.fields.Image.value &&
        Object.keys(props.fields.Image.value).length > 0 ? (
          <div className="flex flex-col gap-10 md:w-1/2">
            {stepTabs.length > 1 && (
              <DropdownMenu
                tabs={stepTabs}
                activeTabIndex={stepTabs.findIndex(
                  (_, idx) => `stepTab-${idx}` === selectedStepTab
                )}
                onTabClick={(index) => handleStepTabChange(`stepTab-${index}`)}
                labelKey="Name"
                labelFallback="Select Step"
              />
            )}

            {stepTabs.length > 1 && (
              <div className="hidden md:flex border border-border-primary">
                {stepTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepTabChange(`stepTab-${index}`)}
                    className={`${baseClasses} ${focusClasses} ${
                      selectedStepTab === `stepTab-${index}`
                        ? `${activeClasses} ${activeHoverClasses} ${activePressClasses}`
                        : `${inactiveClasses} ${hoverClasses} ${inactivePressClasses}`
                    }`}
                  >
                    <JssText field={tab.fields.Name} />
                  </button>
                ))}
              </div>
            )}

            <div>
              {stepTabs.length === 0 ? (
                <p>No tabs available</p>
              ) : (
                stepTabs.map((tab, index) => {
                  const phKey = `kkia-pagecontent-steps-tab-${index}-${props.params.DynamicPlaceholderId}`;

                  return (
                    <div
                      key={`stepTab-${index}`}
                      className={`${
                        selectedStepTab === `stepTab-${index}` ? 'flex' : 'hidden'
                      } flex-col gap-4 md:gap-2`}
                    >
                      {tab.fields.Text.value?.toString() !== '' && (
                        <JssText field={tab.fields.Text} tag="h2" className="text-headline-h2" />
                      )}
                      <Placeholder name={phKey} rendering={props.rendering} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 md:w-full">
            {stepTabs.length > 1 && (
              <DropdownMenu
                tabs={stepTabs}
                activeTabIndex={stepTabs.findIndex(
                  (_, idx) => `stepTab-${idx}` === selectedStepTab
                )}
                onTabClick={(index) => handleStepTabChange(`stepTab-${index}`)}
                labelKey="Name"
                labelFallback="Select Step"
              />
            )}

            {stepTabs.length > 1 && (
              <div className="hidden md:flex border border-border-primary">
                {stepTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepTabChange(`stepTab-${index}`)}
                    className={`${baseClasses} ${focusClasses} ${
                      selectedStepTab === `stepTab-${index}`
                        ? `${activeClasses} ${activeHoverClasses} ${activePressClasses}`
                        : `${inactiveClasses} ${hoverClasses} ${inactivePressClasses}`
                    }`}
                  >
                    <JssText field={tab.fields.Name} />
                  </button>
                ))}
              </div>
            )}

            <div>
              {stepTabs.length === 0 ? (
                <p>No tabs available</p>
              ) : (
                stepTabs.map((tab, index) => {
                  const phKey = `kkia-pagecontent-steps-tab-${index}-${props.params.DynamicPlaceholderId}`;

                  return (
                    <div
                      key={`stepTab-${index}`}
                      className={`${
                        selectedStepTab === `stepTab-${index}` ? 'flex' : 'hidden'
                      } flex-col gap-10 md:gap-2`}
                    >
                      {tab.fields.Text.value?.toString() !== '' && (
                        <JssText field={tab.fields.Text} tag="h2" className="text-headline-h2" />
                      )}
                      <Placeholder name={phKey} rendering={props.rendering} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </SectionPaddingWrapper>
  );
};

export default Steps;
