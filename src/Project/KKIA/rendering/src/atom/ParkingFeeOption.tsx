import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  TextField,
  LinkField,
  ComponentParams,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import ThumbUpSvg from 'assets/icons/ThumbUpSvg';
import CustomLink from 'src/shared-components/CustomLink';

export interface TerminalFields {
  id: string;
  fields: {
    Abbreviation: TextField;
  };
}

export interface ParkingFeeOptionFields {
  Title: TextField;
  Name: TextField;
  'First Note': TextField;
  FirstIcon: ImageField;
  'Second Note': TextField;
  SecondIcon: ImageField;
  'Third Note': TextField;
  ThirdIcon: ImageField;
  Link: LinkField;
  'Border Color': TextField;
  'Background Color': TextField;
  Terminals: TerminalFields[];
}

export type ParkingFeeOptionProps = {
  fields: ParkingFeeOptionFields;
  params: ComponentParams;
  hoursSpent: number;
  flightTerminal?: string;
};

const calculateParkingCost = (
  hours: number,
  type: 'valet' | 'long' | 'short' | 'international'
): number => {
  let cost = 0;
  const days = Math.ceil(hours / 24);

  if (type === 'short' && hours <= 12) {
    cost = hours * 10;
  } else if (type === 'valet') {
    hours = Math.ceil(hours / 24);
    if (hours <= 12) {
      cost = 10 * hours;
    } else if (hours <= 24) {
      cost = 130;
    }
    cost = cost + days * 130;
  } else if (type === 'long') {
    hours = Math.ceil(hours / 24);
    if (hours <= 8) {
      cost = 10 * hours;
    } else if (hours <= 24) {
      cost = 80;
    }
    cost = cost + days * 80;
  } else if (type === 'international') {
    hours = Math.ceil(hours / 24);
    if (days <= 2 && hours <= 12) {
      cost = days * 130 + 10 * hours;
    } else if (days <= 2 && hours <= 24) {
      cost = days * 130;
    } else if (days >= 3) {
      cost = 260 + (days - 2) * 40;
    }
  }

  return cost;
};

const ParkingFeeOption = (props: ParkingFeeOptionProps): JSX.Element | null => {
  const { t } = useI18n();

  let parkingType: 'valet' | 'long' | 'short' | 'international' = 'valet';
  console.log('Parking fee option props', props);
  if (props.fields.Name.value?.toString().toLowerCase().includes('long')) {
    parkingType = 'long';
  } else if (props.fields.Name.value?.toString().toLowerCase().includes('international')) {
    parkingType = 'international';
  } else if (props.fields.Name.value?.toString().toLowerCase().includes('valet')) {
    parkingType = 'valet';
  } else {
    parkingType = 'short';
  }

  const parkingFee = calculateParkingCost(props.hoursSpent, parkingType);

  const backgroundColor = props.fields['Background Color'].value as string;
  const borderColor = props.fields['Border Color'].value as string;

  if (parkingType === 'short' && props.hoursSpent > 12) {
    return null;
  } else if (parkingType === 'long' && props.hoursSpent <= 12) {
    return null;
  }

  const isInternational = props.fields.Name.value
    ?.toString()
    .toLowerCase()
    .includes('international');

  const displayFirstIconAndNote = isInternational
    ? props.flightTerminal === undefined ||
      props.flightTerminal === 'T1' ||
      props.flightTerminal === 'T2' ||
      props.flightTerminal === 'T3' ||
      props.flightTerminal === 'T4'
    : true;

  const displaySecondIconAndNote = isInternational
    ? props.flightTerminal === undefined || props.flightTerminal === 'T5'
    : true;

  return (
    <div className="w-full flex flex-col">
      <div
        style={{ borderColor: borderColor }}
        className="border-t-8 border-jade-dark bg-background-dark flex-1"
      >
        <div
          style={{ backgroundColor: backgroundColor }}
          className="flex justify-between flex-col gap-[0.75rem] bg-jade-light items-center py-[1.5rem] relative"
        >
          <div className="px-[0.75rem] py-[0.25rem] bg-jade-light flex items-center gap-[0.25rem]">
            <ThumbUpSvg />
            <h3 className="text-[1.125rem] text-primary-dark-green uppercase ">
              <JssText field={props.fields.Title} />
            </h3>
          </div>
          <div className="flex flex-col gap-[0.75rem]">
            <div className="flex gap-[0.5rem] items-baseline text-jade-darkest font-bold text-center">
              <p className="text-[2rem]">{parkingFee}</p>
              <span className="text-[1.25rem]">SAR</span>
            </div>
            <h2 className="text-[1rem] text-muted-darker text-center">
              {t('parkingfeecalculator-parkingFee')}
            </h2>
          </div>
        </div>
        <div className="p-[1.5rem] mb-[0.5rem]">
          <p className="text-muted-darker pb-[1.5rem] font-bold">
            <JssText field={props.fields.Name} />
          </p>
          <div>
            {displayFirstIconAndNote && (
              <div className="flex gap-[0.5rem] pb-[0.5rem]">
                <JssImage field={props.fields.FirstIcon} />
                <p className="text-[1rem]">
                  <JssText field={props.fields['First Note']} />
                </p>
              </div>
            )}
            {displaySecondIconAndNote && (
              <div className="flex gap-[0.5rem] pb-[0.5rem]">
                <JssImage field={props.fields.SecondIcon} />
                <p className="text-[1rem]">
                  <JssText field={props.fields['Second Note']} />
                </p>
              </div>
            )}
            <div className="flex gap-[0.5rem]">
              <JssImage field={props.fields.ThirdIcon} />
              <p className="text-[1rem]">
                <JssText field={props.fields['Third Note']} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="c-parking-fee-option--submit bg-background-dark">
        <CustomLink field={props.fields.Link} />
        <img src="/icons/hero-slider-arrow-right.svg" alt="link" />
      </div>
    </div>
  );
};

export default ParkingFeeOption;
