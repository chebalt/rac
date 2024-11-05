import React, { useRef, useState } from 'react';
import {
  RichText as JssRichText,
  TextField,
  ComponentRendering,
  ComponentParams,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import ParkingFeeOption, { ParkingFeeOptionProps } from 'src/atom/ParkingFeeOption';
import InitialCard from 'components/ui/parking-fee-calculator/InitialCard';
import ParkingFeeForm from 'components/ui/parking-fee-calculator/Form';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ArrowGroup from '../shared-components/ArrowGroup';
import SliderPagination from '../shared-components/SliderPagination';
import { Swiper as SwiperType } from 'swiper';

interface ParkingFeeCalculatorFields {
  Title: TextField;
  Subtitle: TextField;
  Description: TextField;
  'Right Box Title': TextField;
  'Right Box Description': TextField;
  Note: Field<string>;
  Offers: Array<ParkingFeeOptionProps>;
  'Button Text': TextField;
  'Parking Time Buffer': TextField;
}

type ParkingFeeCalculatorProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ParkingFeeCalculatorFields;
};

const ParkingFeeCalculatorDefaultComponent = (): JSX.Element => (
  <div>
    <div>
      <span className="is-empty-hint">Parking Fee Calculator</span>
    </div>
  </div>
);

const calculateHoursSpent = (
  entryDate: string,
  entryTime: string,
  exitDate: string,
  exitTime: string
): number => {
  if (!entryDate || !entryTime || !exitDate || !exitTime) {
    return 0;
  }

  const entryDateTime = new Date(`${entryDate}T${entryTime}`);
  const exitDateTime = new Date(`${exitDate}T${exitTime}`);

  const diffMilliseconds = exitDateTime.getTime() - entryDateTime.getTime();
  const diffHours = diffMilliseconds / (1000 * 60 * 60);

  return Math.ceil(diffHours);
};

export const ParkingFeeCalculator = (props: ParkingFeeCalculatorProps): JSX.Element => {
  const { t } = useI18n();
  const [entryDate, setEntryDate] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitDate, setExitDate] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoursSpent, setHoursSpent] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [price, setPrice] = useState(false);
  const [aircraftTerminal, setAircraftTerminal] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  const revealPrices = () => {
    setPrice(!price);
  };

  const handleSubmit = () => {
    if (entryDate && entryTime && exitDate && exitTime) {
      const calculatedHours = calculateHoursSpent(entryDate, entryTime, exitDate, exitTime);
      setHoursSpent(calculatedHours);
      setIsSubmitted(true);
    }
  };

  const filteredOffers = aircraftTerminal
    ? props.fields.Offers.filter((offer) =>
        offer.fields.Terminals.some((terminal) => {
          const abbreviationValue = terminal.fields.Abbreviation.value;
          return (
            typeof abbreviationValue === 'string' &&
            abbreviationValue.toLowerCase().includes(aircraftTerminal.toLowerCase())
          );
        })
      )
    : props.fields.Offers;

  if (props.fields) {
    return (
      <SectionPaddingWrapper className="md:py-24">
        <div className="c-parking-calculator shadow-default md:px-14">
          <InitialCard
            title={props.fields.Title}
            subtitle={props.fields.Subtitle}
            description={props.fields.Description}
            rightBoxTitle={props.fields['Right Box Title']}
            rightBoxDescription={props.fields['Right Box Description']}
            t={t}
            price={price}
            revealPrices={revealPrices}
          />
          {price && (
            <ParkingFeeForm
              entryDate={entryDate}
              entryTime={entryTime}
              exitDate={exitDate}
              exitTime={exitTime}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setEntryDate={setEntryDate}
              setEntryTime={setEntryTime}
              setExitDate={setExitDate}
              setExitTime={setExitTime}
              handleSubmit={handleSubmit}
              t={t}
              buttonText={props.fields['Button Text']}
              parkingTimeBuffer={props.fields['Parking Time Buffer']}
              setAircraftTerminal={setAircraftTerminal}
            />
          )}
          {isSubmitted && (
            <div className="pt-[3.5rem]">
              <div className="c-parking-calculator__options">
                <div className="hidden md:grid grid-cols-3 min-h-[425px] w-full gap-8">
                  {filteredOffers.map((offer, index) => (
                    <ParkingFeeOption
                      key={index}
                      params={props.params}
                      fields={offer.fields}
                      hoursSpent={hoursSpent}
                      flightTerminal={aircraftTerminal ?? undefined}
                    />
                  ))}
                </div>
                <div className="md:hidden w-full">
                  <Swiper
                    ref={swiperRef}
                    className="w-full"
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    spaceBetween={16}
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      nextEl: '.parkingFeeOption-button-next',
                      prevEl: '.parkingFeeOption-button-prev',
                    }}
                    onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
                    onAutoplayTimeLeft={(swiper, time, percentage) => {
                      setTimeLeft(percentage * 100);
                    }}
                  >
                    {props.fields.Offers.map((offer, i) => (
                      <SwiperSlide key={i}>
                        <ParkingFeeOption
                          key={i}
                          params={props.params}
                          fields={offer.fields}
                          hoursSpent={hoursSpent}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="lg:hidden relative w-full flex justify-center items-center py-8">
                    <SliderPagination
                      progress={timeLeft}
                      activePage={activeIndex}
                      goToPage={(index) => slideTo(index)}
                      totalPages={3}
                    />
                    <div className="absolute left-0 right-0">
                      <ArrowGroup
                        nextBtnClassName="parkingFeeOption-button-next"
                        prevBtnClassName="parkingFeeOption-button-prev"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="c-parking-calculator__link">
                <JssRichText
                  className="c-parking-calculator__link--text"
                  field={props.fields.Note}
                />
              </div>
            </div>
          )}
        </div>
      </SectionPaddingWrapper>
    );
  }
  return <ParkingFeeCalculatorDefaultComponent />;
};

export default ParkingFeeCalculator;
