import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import { useSearch } from 'src/contexts/SearchContext';
import { parseISO, subMinutes, format } from 'date-fns';

interface ServiceAvailabilityNoteFields {
  Title: TextField;
  Description: TextField;
  Icon: ImageField;
  ArrivalBufforBeforeFlight?: TextField;
}

interface ServiceAvailabilityNoteProps {
  fields: ServiceAvailabilityNoteFields;
}

export const Default = (props: ServiceAvailabilityNoteProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="pt-10">
      <div className="flex flex-col p-6 bg-info-light border border-info-border gap-3">
        <div className="flex items-center gap-3 max-xl:items-baseline rtl:flex-row-reverse">
          <JssImage className="w-6 h-6 object-contain" field={props.fields.Icon} />
          <JssText field={props.fields.Title} tag="h5" className="text-info font-bold" />
        </div>
        <JssText field={props.fields.Description} tag="h6" className="text-muted text-md" />
      </div>
    </SectionPaddingWrapper>
  );
};

export const FlightResult = (props: ServiceAvailabilityNoteProps): JSX.Element => {
  const { flight } = useSearch();

  const scheduledDate = flight?.scheduled ? parseISO(flight.scheduled) : null;

  const arrivalBuffer = props.fields.ArrivalBufforBeforeFlight?.value
    ? parseInt(String(props.fields.ArrivalBufforBeforeFlight.value), 10)
    : 0;

  const adjustedArrivalTime = scheduledDate ? subMinutes(scheduledDate, arrivalBuffer) : null;

  return (
    <SectionPaddingWrapper className="pt-10">
      <div className="flex flex-col p-6 bg-info-light border border-info-border gap-3">
        <div className="flex items-center gap-3 max-xl:items-baseline rtl:flex-row-reverse">
          <JssImage className="w-6 h-6 object-contain" field={props.fields.Icon} />
          <JssText field={props.fields.Title} tag="h5" className="text-info font-bold" />
        </div>
        <h6 className="text-muted text-md">
          <JssText field={props.fields.Description} />{' '}
          {adjustedArrivalTime ? `${format(adjustedArrivalTime, 'HH:mm')}.` : 'N/A.'}
        </h6>
      </div>
    </SectionPaddingWrapper>
  );
};
