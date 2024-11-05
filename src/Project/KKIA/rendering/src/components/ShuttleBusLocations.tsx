import React, { useState } from 'react';
import { Text as JssText, TextField, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import ShuttleBusLocation, {
  ShuttleBusLocationFields,
  ShuttleBusLocationProps,
} from 'src/atom/ShuttleBusLocation';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import DropdownMenu from './ui/inputs/DropdownMenu';

interface ShuttleBusTypeFields {
  fields: {
    Name: TextField;
  };
}
export interface ShuttleBusLocationsFields {
  Title: TextField;
  'Shuttle Bus Types': ShuttleBusTypeFields[];
  'Shuttle Bus Locations': ShuttleBusLocationProps[];
}

interface ShuttleBusLocationsProps {
  rendering: ComponentRendering;
  fields: ShuttleBusLocationsFields;
}

const ShuttleBusLocations = (props: ShuttleBusLocationsProps): JSX.Element => {
  const [selectedType, setSelectedType] = useState('Airside');

  const types = props.fields['Shuttle Bus Types'] || [];
  const locations = props.fields['Shuttle Bus Locations'] || [];

  const filterLocations = (
    locations: Array<{
      fields: ShuttleBusLocationFields;
    }>
  ) => {
    if (!selectedType) return locations;
    return locations.filter((location) => {
      const shuttleBusType = String(location.fields['Shuttle Bus Type'].fields.Name.value || '');
      const matchesSearchTerm = shuttleBusType.toLowerCase().includes(selectedType.toLowerCase());

      return matchesSearchTerm;
    });
  };

  const filteredLocations = filterLocations(locations);

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
      <div className="flex flex-col gap-10">
        <JssText field={props.fields.Title} tag="h2" className="text-headline-h2 text-primary" />
        <div className="flex flex-col gap-10 md:w-1/2">
          {types.length > 1 && (
            <DropdownMenu
              tabs={types}
              activeTabIndex={types.findIndex((_, idx) => `type-${idx}` === selectedType)}
              onTabClick={(index) => setSelectedType(`type-${index}`)}
              labelKey="Name"
              labelFallback="Select Type"
            />
          )}

          {types.length > 1 && (
            <div className="hidden md:flex border border-border-primary">
              {types.map((type, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedType(String(type.fields?.Name.value || ''))}
                  className={`${baseClasses} ${focusClasses} ${
                    selectedType === String(type.fields?.Name.value || '')
                      ? `${activeClasses} ${activeHoverClasses} ${activePressClasses}`
                      : `${inactiveClasses} ${hoverClasses} ${inactivePressClasses}`
                  }`}
                >
                  <JssText field={type.fields?.Name} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="shuttle-bus-locations">
          {filteredLocations.map((location, index) => (
            <React.Fragment key={index}>
              <ShuttleBusLocation fields={location.fields} />
              {index < filteredLocations.length - 1 && (
                <hr className="my-8 border-t border-border-action-tertiary-default" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default ShuttleBusLocations;
