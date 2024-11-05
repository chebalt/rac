import { Flight } from '../../pages/api/flightsInformation';
import { parseISO, format, isValid } from 'date-fns';
import {
  Text as JssText,
  Link as JssLink,
  Image as JssImage,
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';

import { useSearch } from 'src/contexts/SearchContext';
import { useRouter } from 'next/router';
import ApplicationPushInstruction, {
  ApplicationPushInstructionProps,
} from 'src/atom/ApplicationPushInstruction';
import { useEffect, useState } from 'react';

interface DeparturesAndArrivalsTabsFields {
  FirstTabTitle: TextField;
  FirstTabIcon: ImageField;
  SecondTabTitle: TextField;
  SecondTabIcon: ImageField;
  AirlineSelectionTitle: TextField;
  UpdatedText: TextField;
  CodeshareText: TextField;
  TerminalText: TextField;
  CheckInText: TextField;
  GateText: TextField;
  FlightDetailsLinkText: TextField;
  OnTimeText: TextField;
  ClosedText: TextField;
  CancelledText: TextField;
  DepartedText: TextField;
  DelayedText: TextField;
  ArrivedText: TextField;
  LandedText: TextField;
  ExpectedText: TextField;
  BaggageText: TextField;
  ButtonText: TextField;
  BottomText: TextField;
  BottomLogo: ImageField;
  PhoneNumber: LinkField;
  PhoneNumberIcon: ImageField;
  WhatsAppTextMessage: TextField;
  ContactTooltipText: TextField;
  MissingDataText: TextField;
  PushNotificationIcon: ImageField;
  PushNotificationTooltipText: TextField;
  PushNotificationTitle: TextField;
  MobileTabText: TextField;
  MobileFirstStepText: TextField;
  MobileApplications: ApplicationPushInstructionProps[];
  MobileSecondStepText: TextField;
  WebsiteTabText: TextField;
  WebsiteFirstStepText: TextField;
  WebsiteApplications: ApplicationPushInstructionProps[];
  WebsiteSecondStepText: TextField;
  MissingAirlineLogo: ImageField;
}

interface FlightItemProps {
  flight: Flight;
  fields?: DeparturesAndArrivalsTabsFields;
}

export default function FlightItem({ flight, fields }: FlightItemProps) {
  const { setFlight } = useSearch();
  const router = useRouter();
  const [showPushNotificationBox, setShowPushNotificationBox] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState('');

  useEffect(() => {
    if (
      fields?.PhoneNumber?.value?.href &&
      fields?.WhatsAppTextMessage &&
      flight?.airline?.code &&
      flight?.number
    ) {
      const phoneNumber = fields.PhoneNumber.value.href.replace('tel:', ''); // Extract phone number from Sitecore link
      const message = `${fields.WhatsAppTextMessage.value}: ${flight.airline.code} ${flight.number}`;
      const link = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}&type=phone_number&app_absent=0`;
      setWhatsAppLink(link);
    }
  }, [fields, flight]);

  const handleClick = () => {
    setFlight(flight);
    localStorage.setItem('flight', JSON.stringify(flight));
    console.log('Setting flight:', flight);
    const pathFromWindow = typeof window !== 'undefined' ? window.location.pathname : '';
    const segments = pathFromWindow.split('/').filter(Boolean);
    const cleanedSegments = Array.from(new Set(segments));

    let finalPath = `/${cleanedSegments.join('/')}`;
    if (finalPath.endsWith('/flights/departures-and-arrivals')) {
      finalPath += '/Travel-Schedule';
    }

    router.push(finalPath);
  };

  const getRemarkElement = (
    remarkDescription: string | undefined,
    scheduled: string | null,
    estimated: string | null,
    actual: string | null,
    firstBag: string | null,
    lastBag: string | null,
    offBlock: string | null,
    calculatedTakeOff: string | null,

    departureOrArrival: string
  ) => {
    const scheduledDate = scheduled ? new Date(scheduled) : null;
    const estimatedDate = estimated ? new Date(estimated) : null;
    const actualDate = actual ? new Date(actual) : null;
    const lastBagDate = lastBag ? new Date(lastBag) : null;
    const firstBagDate = firstBag ? new Date(firstBag) : null;
    const offBlockDate = offBlock ? new Date(offBlock) : null;
    const calculatedTakeOffDate = calculatedTakeOff ? new Date(calculatedTakeOff) : null;

    if (!remarkDescription) {
      if (
        firstBagDate &&
        lastBagDate &&
        actualDate &&
        actualDate >= firstBagDate &&
        actualDate <= lastBagDate
      ) {
        return fields?.BaggageText ? <JssText field={fields.BaggageText} /> : null;
      }

      if (departureOrArrival === 'Arrival' && actualDate && actualDate < new Date()) {
        return fields?.ArrivedText ? <JssText field={fields.ArrivedText} /> : null;
      }
      if (
        departureOrArrival === 'Departure' &&
        (!offBlockDate || (offBlockDate && offBlockDate < new Date())) &&
        (!calculatedTakeOffDate || (calculatedTakeOffDate && calculatedTakeOffDate < new Date())) &&
        (!estimatedDate || (estimatedDate && estimatedDate < new Date())) &&
        (!actualDate || (actualDate && actualDate < new Date()))
      ) {
        return fields?.DepartedText ? <JssText field={fields.DepartedText} /> : null;
      }

      if (
        remarkDescription?.toLowerCase() === 'cancelled' ||
        (!estimatedDate && !actualDate && scheduledDate && scheduledDate < new Date())
      ) {
        return fields?.CancelledText ? <JssText field={fields.CancelledText} /> : null;
      }
      if (
        estimatedDate !== null &&
        scheduledDate !== null &&
        estimatedDate.getTime() > scheduledDate.getTime()
      ) {
        return fields?.DelayedText ? <JssText field={fields.DelayedText} /> : null;
      }

      if (scheduledDate && estimatedDate && scheduledDate.getTime() >= estimatedDate.getTime()) {
        return fields?.OnTimeText ? <JssText field={fields.OnTimeText} /> : null;
      }

      if (
        departureOrArrival === 'Departure' &&
        lastBagDate &&
        lastBagDate < new Date() &&
        estimatedDate &&
        estimatedDate > new Date()
      ) {
        return fields?.ClosedText ? <JssText field={fields.ClosedText} /> : null;
      }

      if (
        departureOrArrival === 'Arrival' &&
        !actualDate &&
        ((scheduledDate && scheduledDate > new Date()) ||
          (estimatedDate && estimatedDate > new Date()))
      ) {
        return fields?.ExpectedText ? <JssText field={fields.ExpectedText} /> : null;
      }

      return fields?.OnTimeText ? <JssText field={fields.OnTimeText} /> : null;
    }

    const normalizedRemark = remarkDescription?.toLowerCase() || '';

    switch (normalizedRemark) {
      case 'on time':
        return fields?.OnTimeText ? <JssText field={fields.OnTimeText} /> : null;
      case 'closed':
        return fields?.ClosedText ? <JssText field={fields.ClosedText} /> : null;
      case 'cancelled':
        return fields?.CancelledText ? <JssText field={fields.CancelledText} /> : null;
      case 'departed':
        return fields?.DepartedText ? <JssText field={fields.DepartedText} /> : null;
      case 'delayed':
        return fields?.DelayedText ? <JssText field={fields.DelayedText} /> : null;
      case 'arrived':
        return fields?.ArrivedText ? <JssText field={fields.ArrivedText} /> : null;
      case 'expected':
        return fields?.ExpectedText ? <JssText field={fields.ExpectedText} /> : null;
      case 'baggage':
        return fields?.BaggageText ? <JssText field={fields.BaggageText} /> : null;
      default:
        return fields?.OnTimeText ? <JssText field={fields.OnTimeText} /> : null;
    }
  };

  const handlePushNotificationClick = () => {
    setShowPushNotificationBox(!showPushNotificationBox);
  };

  return (
    <div
      key={flight.id}
      className="flex items-center gap-8 p-6 bg-[#F4FAF980] shadow-default dir-rtl"
    >
      <div className="flex flex-col min-w-[50px]">
        <span
          className={clsx(
            flight.estimated &&
              isValid(parseISO(flight.estimated)) &&
              new Date(flight.estimated) > new Date(flight.scheduled)
              ? 'line-through text-body-medium-regular text-text-secondary'
              : 'text-body-medium-bold text-text-primary'
          )}
        >
          {format(parseISO(flight.scheduled), 'HH:mm')}
        </span>
        {flight.estimated &&
          isValid(parseISO(flight.estimated)) &&
          new Date(flight.estimated) > new Date(flight.scheduled) && (
            <span className="text-body-medium-bold text-text-primary">
              {format(parseISO(flight.estimated), 'HH:mm')}
            </span>
          )}
      </div>

      <div className="flex flex-col items-center pl-6 border-l border-border-primary h-[80px] min-w-[300px] rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
        <span className="text-body-medium-bold text-text-primary">
          {flight.departureOrArrival.toLowerCase() === 'arrival' ? (
            <>
              {flight.departureAirport.name} ({flight.departureAirport.code})
            </>
          ) : flight.departureOrArrival.toLowerCase() === 'departure' ? (
            <>
              {flight.arrivalAirport.name} ({flight.arrivalAirport.code})
            </>
          ) : null}
        </span>
        <span className="text-body-medium-bold text-text-primary">
          {flight.airline.code} {flight.number}
        </span>

        {fields?.CodeshareText &&
          flight.associatedFlightNumber &&
          flight.associatedFlightAirline?.callSign && (
            <div className="flex">
              <JssText
                field={fields.CodeshareText}
                tag="p"
                className="text-body-extra-small-light text-text-secondary"
              />
              :
              <span className="text-body-extra-small-light text-text-secondary">{`${flight.associatedFlightAirline.code}${flight.associatedFlightNumber}`}</span>
            </div>
          )}
      </div>

      <div className="hidden md:flex items-center gap-8 h-[80px] w-full">
        <div className="border-l border-border-primary pl-6 h-full min-w-[230px] flex items-center rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
          <span className="text-body-normal-light text-text-primary">
            {flight.airline.description}
          </span>
        </div>

        <div className="border-l border-border-primary pl-6 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6 h-[80px] min-w-[180px]">
          <p className="text-body-normal-light text-text-secondary">
            {fields?.TerminalText && <JssText field={fields.TerminalText} />}:
            {flight.aircraftTerminal && (
              <span className="text-body-normal-bold text-text-primary">
                {flight.aircraftTerminal
                  ? `${flight.aircraftTerminal.charAt(0)}${flight.aircraftTerminal.slice(-1)}`
                  : ''}
              </span>
            )}
          </p>
          <p className="text-body-normal-light text-text-secondary">
            {flight.checkInFirstPositionResource
              ? fields?.CheckInText && (
                  <>
                    <JssText field={fields.CheckInText} />
                    <span className="text-body-normal-bold text-text-primary">
                      : {flight.checkInFirstPositionResource}
                    </span>
                  </>
                )
              : fields?.CheckInText &&
                fields?.MissingDataText && (
                  <>
                    <JssText field={fields.CheckInText} />
                    <span>: </span>
                    <JssText field={fields.MissingDataText} />
                  </>
                )}
          </p>

          <p className="text-body-normal-light text-text-secondary">
            {flight.passengerGate
              ? fields?.GateText && (
                  <>
                    <JssText field={fields.GateText} />
                    <span>: </span>
                    <span className="text-body-normal-bold text-text-primary">
                      {flight.passengerGate}
                    </span>
                  </>
                )
              : fields?.GateText &&
                fields?.MissingDataText && (
                  <>
                    <JssText field={fields.GateText} />
                    <span>: </span>
                    <JssText field={fields.MissingDataText} />
                  </>
                )}
          </p>
        </div>

        <div className="border-l border-border-primary pl-6 h-[80px] flex w-full justify-between items-center rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
          <div className="text-text-info text-body-small-regular bg-surface-info px-2">
            {getRemarkElement(
              flight.remark?.description,
              flight.scheduled,
              flight.estimated,
              flight.actual,
              flight.firstBag,
              flight.lastBag,
              flight.offBlock,
              flight.calculatedTakeOff,
              flight.departureOrArrival
            )}
          </div>
          <div>
            {whatsAppLink && (
              <div>
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                  {fields?.PhoneNumberIcon && (
                    <JssImage field={fields.PhoneNumberIcon} className="w-7 h-7" />
                  )}
                </a>
                {fields?.ContactTooltipText && <JssText field={fields.ContactTooltipText} />}
              </div>
            )}
          </div>
          <div>
            <div>
              <div onClick={handlePushNotificationClick} style={{ cursor: 'pointer' }}>
                {fields?.PushNotificationIcon && (
                  <JssImage field={fields.PushNotificationIcon} className="w-7 h-7" />
                )}
              </div>
              {fields?.PushNotificationTooltipText && (
                <JssText field={fields.PushNotificationTooltipText} />
              )}
              {showPushNotificationBox && (
                <div className="absolute bg-white shadow-lg p-4 rounded-md max-w-md">
                  <h3 className="text-lg font-bold mb-2">
                    {fields?.PushNotificationTitle && (
                      <JssText field={fields.PushNotificationTitle} />
                    )}
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-semibold">
                      {fields?.MobileTabText && <JssText field={fields.MobileTabText} />}
                    </h4>
                    <p>
                      {fields?.MobileFirstStepText && (
                        <JssText field={fields.MobileFirstStepText} />
                      )}
                    </p>
                    <div className="space-y-2">
                      {fields?.MobileApplications?.map((app, index) => (
                        <ApplicationPushInstruction key={index} fields={app.fields} />
                      ))}
                    </div>
                    <p>
                      {fields?.MobileSecondStepText && (
                        <JssText field={fields.MobileSecondStepText} />
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      {fields?.WebsiteTabText && <JssText field={fields.WebsiteTabText} />}
                    </h4>
                    <p>
                      {fields?.WebsiteFirstStepText && (
                        <JssText field={fields.WebsiteFirstStepText} />
                      )}
                    </p>
                    <div className="space-y-2">
                      {fields?.WebsiteApplications?.map((app, index) => (
                        <ApplicationPushInstruction key={index} fields={app.fields} />
                      ))}
                    </div>
                    <p>
                      {fields?.WebsiteSecondStepText && (
                        <JssText field={fields.WebsiteSecondStepText} />
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            {fields?.FlightDetailsLinkText && <JssText field={fields.FlightDetailsLinkText} />}
          </div>
        </div>
      </div>
    </div>
  );
}
