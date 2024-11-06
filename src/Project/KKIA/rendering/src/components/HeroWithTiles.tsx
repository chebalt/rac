import React, { useCallback, useEffect, useState } from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  LinkField,
  ImageField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import { useSearch } from 'src/contexts/SearchContext';
import FlightTile from './FlightTile';
import { format, isValid, parseISO } from 'date-fns';
import clsx from 'clsx';
import HeroTag from './HeroTag';
import RefreshCircleSvg from 'assets/icons/RefreshCircleSvg';
import axios from 'axios';
import { Flight } from 'src/pages/api/flightsInformation';
import CustomLink from 'src/shared-components/CustomLink';

interface HeroWithTilesFields {
  Title: TextField;
  Location: LinkField;
  LocationIcon: ImageField;
  Image: ImageField;
  Content: TextField;
  AirlineIcon: ImageField;
  Airline: TextField;
  FlightNumber: TextField;
  ToText: TextField;
  FromText: TextField;
  UpdatedText: TextField;
  DateText: TextField;
  DateIcon: ImageField;
  DepartureTimeText: TextField;
  DepartureTimeIcon: ImageField;
  TerminalText: TextField;
  TerminalIcon: ImageField;
  CheckInText: TextField;
  CheckInIcon: ImageField;
  GateText: TextField;
  GateIcon: ImageField;
  CodeShareText: TextField;
  AirplaneText: TextField;
  DownloadFlightDetailsText: TextField;
  DownloadFlightDetailsIcon: ImageField;
  NotificationIcon: ImageField;
  PhoneNumber: LinkField;
  PhoneNumberIcon: ImageField;
  WhatsAppTextMessage: TextField;
  OnTimeText: TextField;
  ClosedText: TextField;
  CancelledText: TextField;
  DepartedText: TextField;
  DelayedText: TextField;
  ArrivedText: TextField;
  ExpectedText: TextField;
  BaggageText: TextField;
  DefaultBackground: ImageField;
  DefaultAirlineLogo: ImageField;
  MissingDatabaseDataMessage: TextField;
}

interface HeroWithTilesProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: HeroWithTilesFields;
}

export const Default = (props: HeroWithTilesProps): JSX.Element => {
  return (
    <div className="relative w-full xl:h-[376px]">
      <div className="relative top-0 left-0 right-0 h-[376px] object-contain max-md:h-[372px]">
        <JssImage
          field={props.fields?.Image}
          className="w-full h-full object-cover xl:object-[center_-320px]"
        />
        <SectionPaddingWrapper
          childrenClass="h-full"
          className="z-20 absolute top-0 left-0 right-0 bottom-0 bg-green-overlay max-md:pt-14"
        >
          <div className="flex flex-col justify-end h-full rtl:items-end">
            <Placeholder
              name={`kkia-pagecontent-hero-tags-${props.params.DynamicPlaceholderId}`}
              rendering={props.rendering}
            />

            <JssText
              field={props.fields?.Title}
              tag="h2"
              className="text-4xl md:text-[4rem] text-jade-light font-bold lg:mb-14 pt-14 leading-[4.5rem] line-clamp-3"
            />

            <div className="text-jade-light flex items-center">
              <JssImage field={props.fields?.LocationIcon} />
              <CustomLink
                field={props.fields?.Location}
                className="text-jade-light font-light ml-2"
              />
            </div>
          </div>
        </SectionPaddingWrapper>
      </div>

      <SectionPaddingWrapper className="lg:absolute md:bottom-0 md:left-0 md:right-0 md:z-30 md:gap-x-4 lg:translate-y-[54px]">
        <div className="w-full flex justify-between flex-col lg:flex-row xl:px-0 md:gap-6">
          <Placeholder
            name={`kkia-pagecontent-hero-tiles-${props.params.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
      </SectionPaddingWrapper>
    </div>
  );
};

export const HeroWithStars = (props: HeroWithTilesProps): JSX.Element => {
  return (
    <div className="relative w-full xl:h-[376px]">
      <div className="relative top-0 left-0 right-0 h-[376px] object-contain max-md:h-[372px]">
        <JssImage
          field={props.fields?.Image}
          className="w-full h-full object-cover xl:object-[center_-320px]"
        />
        <SectionPaddingWrapper
          childrenClass="h-full"
          className="z-20 absolute top-0 left-0 right-0 bottom-0 bg-green-overlay max-md:pt-14"
        >
          <div className="flex flex-col justify-end h-full rtl:items-end">
            <Placeholder
              name={`kkia-pagecontent-hero-tags-${props.params.DynamicPlaceholderId}`}
              rendering={props.rendering}
            />

            <div className="flex flex-col gap-3 pt-14">
              <div className="flex items-center gap-3">
                <Placeholder
                  name={`kkia-pagecontent-hero-icons-${props.params.DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
              <JssText
                field={props.fields?.Title}
                tag="h2"
                className="text-4xl md:text-[4rem] text-jade-light font-bold lg:mb-14 pt-3 leading-[4.5rem]"
              />
            </div>

            <div className="text-jade-light flex items-center">
              <JssText field={props.fields?.Content} />
            </div>
          </div>
        </SectionPaddingWrapper>
      </div>
    </div>
  );
};

export const HeroFlights = (props: HeroWithTilesProps): JSX.Element => {
  return (
    <div className="relative w-full xl:h-[524px] bg-green-overlay">
      <div className="relative top-0 left-0 right-0 h-[524px] object-contain max-md:h-[524px]">
        <JssImage
          field={props.fields?.Image}
          className="w-full h-full object-cover xl:object-[center_-524px]"
        />
      </div>

      <SectionPaddingWrapper className="lg:absolute md:bottom-0 md:left-0 md:right-0 md:z-30 md:gap-x-4 lg:translate-y-[54px]">
        <div className="flex flex-col justify-end mb-[2.125rem]">
          <div className="flex items-center gap-1 px-2 py-1.5 bg-jade-light w-fit">
            <JssImage
              className="w-[36px] h-[36px] object-cover"
              field={props.fields?.AirlineIcon}
            />
            <JssText
              tag="p"
              className="text-body-normal-regular text-primary-dark-green"
              field={props.fields?.Airline}
            />
          </div>
          <div className="flex flex-col gap-3 my-6">
            <JssText
              tag="p"
              className="text-2xl text-jade-light"
              field={props.fields?.FlightNumber}
            />
            <JssText
              field={props.fields?.Title}
              tag="h2"
              className="text-headline-h1 text-jade-light"
            />
          </div>

          <Placeholder
            name={`kkia-pagecontent-hero-tags-${props.params.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="w-full flex justify-between flex-col lg:flex-row">
          <Placeholder
            name={`kkia-pagecontent-hero-flighttiles-${props.params.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
      </SectionPaddingWrapper>
    </div>
  );
};

export const HeroFlightsResult = (props: HeroWithTilesProps): JSX.Element => {
  const { flight, setFlight } = useSearch();
  const [whatsAppLink, setWhatsAppLink] = useState('');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const apiUrl = `${baseUrl}/api/flightsInformation`;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (
      props.fields?.PhoneNumber?.value?.href &&
      props.fields?.WhatsAppTextMessage &&
      flight?.airline?.code &&
      flight?.number
    ) {
      const phoneNumber = props.fields.PhoneNumber.value.href.replace('tel:', '');
      const message = `${props.fields.WhatsAppTextMessage.value}: ${flight.airline.code} ${flight.number}`;
      const link = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}&type=phone_number&app_absent=0`;
      setWhatsAppLink(link);
    }
  }, [props.fields, flight]);

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Flight[]>(apiUrl);
      const newFlights = response.data;

      const updatedFlight = newFlights.find(
        (f: {
          number: string | undefined;
          airline: { code: string | undefined };
          scheduled: string | undefined;
          departureOrArrival: string | undefined;
        }) =>
          f.number === flight?.number &&
          f.airline?.code === flight?.airline?.code &&
          f.scheduled === flight?.scheduled &&
          f.departureOrArrival === flight?.departureOrArrival
      );

      if (updatedFlight) {
        setFlight(updatedFlight);
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, flight, setFlight]);

  const tileConfigurations = [
    {
      HeaderIcon: props.fields.DateIcon,
      Header: props.fields.DateText,
      Text: flight
        ? {
            value: new Date(flight.scheduled).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            }),
          }
        : undefined,
      SupportiveText: undefined,
    },
    {
      HeaderIcon: props.fields.DepartureTimeIcon,
      Header: props.fields.DepartureTimeText,
      Text: flight
        ? {
            value: new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: 'Asia/Riyadh',
            }).format(new Date(flight.scheduled)),
          }
        : undefined,
      SupportiveText:
        flight?.estimated &&
        new Date(flight.estimated).getTime() !== new Date(flight.scheduled).getTime() &&
        new Date(flight.estimated) > new Date(flight.scheduled)
          ? {
              value: new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Riyadh',
              }).format(new Date(flight.estimated)),
            }
          : undefined,
    },
    {
      HeaderIcon: props.fields.TerminalIcon,
      Header: props.fields.TerminalText,
      Text: flight?.aircraftTerminal
        ? { value: flight.aircraftTerminal }
        : props.fields.MissingDatabaseDataMessage,
      SupportiveText: undefined,
    },
    {
      HeaderIcon: props.fields.CheckInIcon,
      Header: props.fields.CheckInText,
      Text: flight?.checkInFirstPositionResource
        ? { value: flight.checkInFirstPositionResource }
        : props.fields.MissingDatabaseDataMessage,
      SupportiveText: undefined,
    },
    {
      HeaderIcon: props.fields.GateIcon,
      Header: props.fields.GateText,
      Text: flight?.passengerGate
        ? { value: flight.passengerGate }
        : props.fields.MissingDatabaseDataMessage,
      SupportiveText: undefined,
    },
  ];

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
        return props.fields?.BaggageText;
      }

      if (departureOrArrival === 'Arrival' && actualDate && actualDate < new Date()) {
        return props.fields?.ArrivedText;
      }
      if (
        departureOrArrival === 'Departure' &&
        (!offBlockDate || (offBlockDate && offBlockDate < new Date())) &&
        (!calculatedTakeOffDate || (calculatedTakeOffDate && calculatedTakeOffDate < new Date())) &&
        (!estimatedDate || (estimatedDate && estimatedDate < new Date())) &&
        (!actualDate || (actualDate && actualDate < new Date()))
      ) {
        return props.fields?.DepartedText;
      }

      if (
        remarkDescription?.toLowerCase() === 'cancelled' ||
        (!estimatedDate && !actualDate && scheduledDate && scheduledDate < new Date())
      ) {
        return props.fields?.CancelledText;
      }
      if (
        estimatedDate !== null &&
        scheduledDate !== null &&
        estimatedDate.getTime() > scheduledDate.getTime()
      ) {
        return props.fields?.DelayedText;
      }

      if (scheduledDate && estimatedDate && scheduledDate.getTime() >= estimatedDate.getTime()) {
        return props.fields?.OnTimeText;
      }

      if (
        departureOrArrival === 'Departure' &&
        lastBagDate &&
        lastBagDate < new Date() &&
        estimatedDate &&
        estimatedDate > new Date()
      ) {
        return props.fields?.ClosedText;
      }

      if (
        departureOrArrival === 'Arrival' &&
        !actualDate &&
        ((scheduledDate && scheduledDate > new Date()) ||
          (estimatedDate && estimatedDate > new Date()))
      ) {
        return props.fields?.ExpectedText;
      }

      return props.fields?.OnTimeText;
    }

    const normalizedRemark = remarkDescription?.toLowerCase() || '';

    switch (normalizedRemark) {
      case 'on time':
        return props.fields?.OnTimeText;
      case 'closed':
        return props.fields?.ClosedText;
      case 'cancelled':
        return props.fields?.CancelledText;
      case 'departed':
        return props.fields?.DepartedText;
      case 'delayed':
        return props.fields?.DelayedText;
      case 'arrived':
        return props.fields?.ArrivedText;
      case 'expected':
        return props.fields?.ExpectedText;
      case 'baggage':
        return props.fields?.BaggageText;
      default:
        return props.fields?.OnTimeText;
    }
  };

  const handleRefresh = async () => {
    await fetchFlights();
  };

  return (
    <>
      {flight && (
        <div className="relative w-full xl:h-[524px] bg-green-overlay">
          <div className="relative top-0 left-0 right-0 h-[524px] object-contain max-md:h-[524px]">
            <JssImage
              field={props.fields?.DefaultBackground}
              className="w-full h-full object-cover xl:object-[center_-524px]"
            />
          </div>

          <SectionPaddingWrapper className="lg:absolute md:bottom-0 md:left-0 md:right-0 md:z-30 md:gap-x-4 lg:translate-y-[54px]">
            <div className="flex flex-col justify-end mb-[2.125rem]">
              <div className="flex items-center gap-1 px-2 py-1.5 bg-jade-light w-fit">
                <JssImage
                  className="w-[36px] h-[36px] object-cover"
                  field={props.fields?.DefaultAirlineLogo}
                />
                <p className="text-body-normal-regular text-primary-dark-green">
                  {flight.airline?.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 my-6">
                <p className="text-2xl text-jade-light">
                  {flight.airline?.code} {flight.number}
                </p>
                <JssText
                  tag="span"
                  className="text-2xl text-jade-light"
                  field={
                    flight.departureOrArrival.toLowerCase() === 'arrival'
                      ? props.fields?.FromText
                      : props.fields?.ToText
                  }
                />
                <h2 className="text-headline-h1 text-jade-light">
                  {flight.departureOrArrival.toLowerCase() === 'arrival' ? (
                    <>{flight.departureAirport.city.name}</>
                  ) : flight.departureOrArrival.toLowerCase() === 'departure' ? (
                    <>{flight.arrivalAirport.city.name}</>
                  ) : null}
                </h2>

                <HeroTag
                  fields={{
                    'Icon Left': undefined,
                    Name: getRemarkElement(
                      flight.remark?.description,
                      flight.scheduled,
                      flight.estimated,
                      flight.actual,
                      flight.firstBag,
                      flight.lastBag,
                      flight.offBlock,
                      flight.calculatedTakeOff,
                      flight.departureOrArrival
                    ),
                    'Icon Right': undefined,
                  }}
                />
              </div>
            </div>
            <div className="w-full flex justify-between flex-col lg:flex-row">
              {tileConfigurations.map((tile, index) => (
                <FlightTile
                  key={index}
                  fields={{
                    HeaderIcon: tile.HeaderIcon,
                    Header: tile.Header,
                    Text: tile.Text,
                    SupportiveText: tile.SupportiveText,
                    AdditionalIcon: undefined,
                    AdditionalText: undefined,
                    AdditionalSupportiveText: undefined,
                    MissingDataText: undefined,
                  }}
                />
              ))}
            </div>
            <div className="hidden items-center gap-2 md:flex flex-shrink-0">
              <p className="text-text-primary text-body-normal-light">
                {props.fields?.UpdatedText && <JssText field={props.fields.UpdatedText} />}:{' '}
                {flight.updated
                  ? new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      timeZone: 'Asia/Riyadh',
                    }).format(new Date(flight.updated))
                  : new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      timeZone: 'Asia/Riyadh',
                    }).format(new Date())}
              </p>
              <div className="w-6 h-6 cursor-pointer" onClick={handleRefresh}>
                {loading ? <p>Loading...</p> : <RefreshCircleSvg />}
              </div>
            </div>
            {props.fields?.CodeShareText &&
              flight.associatedFlightNumber &&
              flight.associatedFlightAirline?.callSign && (
                <div className="flex">
                  <JssText
                    field={props.fields.CodeShareText}
                    tag="p"
                    className="text-body-extra-small-light text-text-secondary"
                  />
                  :
                  <span className="text-body-extra-small-light text-text-secondary">{`${flight.associatedFlightAirline.code}${flight.associatedFlightNumber}`}</span>
                </div>
              )}
            <JssText
              className="w-[36px] h-[36px] object-cover"
              field={props.fields?.AirplaneText}
            />
            <span>: </span>
            {flight.aircraftSubType?.description ? (
              <span>{flight.aircraftSubType.description}</span>
            ) : (
              <JssText
                className="w-[36px] h-[36px] object-cover"
                field={props.fields?.MissingDatabaseDataMessage}
              />
            )}
            <JssText field={props.fields?.DownloadFlightDetailsText} />
            <JssImage field={props.fields?.DownloadFlightDetailsIcon} />
            <div style={{ cursor: 'pointer' }}>
              {props.fields?.NotificationIcon && (
                <JssImage field={props.fields.NotificationIcon} className="w-7 h-7" />
              )}
            </div>
            <div>
              {whatsAppLink && (
                <div>
                  <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                    {props.fields?.PhoneNumberIcon && (
                      <JssImage field={props.fields.PhoneNumberIcon} className="w-7 h-7" />
                    )}
                  </a>
                </div>
              )}
            </div>
          </SectionPaddingWrapper>
        </div>
      )}
    </>
  );
};
