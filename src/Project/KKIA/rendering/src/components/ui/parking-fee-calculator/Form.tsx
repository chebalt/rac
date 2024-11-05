import React, { useCallback, useEffect, useRef, useState } from 'react';
import Datepicker from 'components/ui/datepicker/Datepicker';
import Timepicker from 'components/ui/timepicker/Timepicker';
import axios from 'axios';
import { Flight } from 'src/pages/api/flightsInformation';
import PlaneIconSvg from 'assets/icons/PlaneIconSvg';
import InfoIconSvg from 'assets/icons/InfoIconSvg';
import ChevronDownSvg from 'assets/icons/ChevronUpDown';
import CloseSvg from 'assets/icons/CloseSvg';
import { TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import CalendarIconSvg from 'assets/icons/CalendarIconSvg';

type ParkingFeeFormProps = {
  entryDate: string;
  entryTime: string;
  exitDate: string;
  exitTime: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setEntryDate: React.Dispatch<React.SetStateAction<string>>;
  setEntryTime: React.Dispatch<React.SetStateAction<string>>;
  setExitDate: React.Dispatch<React.SetStateAction<string>>;
  setExitTime: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  t: (key: string) => string;
  buttonText: TextField;
  parkingTimeBuffer: TextField;
  setAircraftTerminal: React.Dispatch<React.SetStateAction<string | null>>;
};

const ParkingFeeForm: React.FC<ParkingFeeFormProps> = ({
  entryDate,
  entryTime,
  exitDate,
  exitTime,
  searchTerm,
  setSearchTerm,
  setEntryDate,
  setEntryTime,
  setExitDate,
  setExitTime,
  handleSubmit,
  t,
  buttonText,
  parkingTimeBuffer,
  setAircraftTerminal,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const apiUrl = `${baseUrl}/api/flightsInformation`;

  const fetchFlights = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const handleSearch = useCallback(() => {
    const currentDate = new Date();

    const filteredResults = flights
      .filter((flight) => {
        const combinedString = `${flight.airline.code} ${flight.number}`.toLowerCase();
        return combinedString.includes(searchTerm.toLowerCase());
      })
      .reduce((uniqueFlights: Flight[], flight: Flight) => {
        const flightDate = new Date(flight.scheduled);

        if (flightDate > currentDate) {
          const existingFlight = uniqueFlights.find(
            (uniqueFlight) => uniqueFlight.number === flight.number
          );

          if (!existingFlight || new Date(existingFlight.scheduled) > flightDate) {
            return [
              ...uniqueFlights.filter((uniqueFlight) => uniqueFlight.number !== flight.number),
              flight,
            ];
          }
        }

        return uniqueFlights;
      }, [])
      .sort((a, b) => {
        const dateA = new Date(a.scheduled);
        const dateB = new Date(b.scheduled);
        return dateA.getTime() - dateB.getTime();
      });

    setSearchResults(filteredResults);
  }, [flights, searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, handleSearch]);

  const handleResultClick = (result: Flight) => {
    setSearchTerm(`${result.airline.code} - ${result.number}`);
    setSearchResults([]);
    setIsDropdownOpen(false);

    const [date, time] = result.scheduled.split('T');
    setEntryDate(date);

    const parkingHours = parseInt(parkingTimeBuffer?.value?.toString() || '0', 10);
    const [hours, minutes] = time.slice(0, 5).split(':').map(Number);
    const newHours = hours - parkingHours;

    const adjustedTime = `${newHours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    setEntryTime(adjustedTime);

    setAircraftTerminal(result.aircraftTerminal);
    console.log(result.aircraftTerminal);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [dropdownRef]);

  const [errors, setErrors] = useState({
    entryDate: false,
    entryTime: false,
    exitDate: false,
    exitTime: false,
  });

  const isPastDate = (dateStr: string) => {
    const today = new Date();
    const selectedDate = new Date(dateStr);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };

  const validateInputs = () => {
    const entryDateObj = new Date(entryDate);
    const exitDateObj = new Date(exitDate);

    const newErrors = {
      entryDate: !entryDate || isPastDate(entryDate),
      entryTime: !entryTime,
      exitDate: !exitDate || exitDateObj < entryDateObj,
      exitTime: !exitTime || (exitDate === entryDate && exitTime <= entryTime),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFocus = () => setIsDropdownOpen(true);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div>
      <div className="c-parking-fee-form">
        <div className="c-parking-fee-form__inputs">
          <div className="c-parking-fee-form-input max-xl:max-w-[100%] max-xl:flex-[1_1_100%] max-xl:pr-0">
            <div className="flight-picker rtl:text-right">
              <label
                htmlFor="flight-picker-input"
                className="text-[0.875rem] text-muted-darkest mb-[0.25rem]"
              >
                {t('parkingfeecalculator-flightNumber')} ({t('parkingfeecalculator-optional')})
              </label>

              <div className="flight-picker__input-container rtl:flex-row-reverse">
                <span className="flight-picker__icon">
                  <PlaneIconSvg className="w-[24px] h-[24px]" />
                </span>
                <input
                  id="flight-picker-input"
                  type="text"
                  value={searchTerm}
                  className="flight-picker__input"
                  placeholder={t('parkingfeecalculator-enterFlightNumber')}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {searchTerm ? (
                  <span className="cursor-pointer" onClick={() => setSearchTerm('')}>
                    <CloseSvg className="w-6 h-6" />
                  </span>
                ) : (
                  <span
                    className={`flight-picker__dropdown-icon transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    onClick={toggleDropdown}
                  >
                    <ChevronDownSvg className="w-6 h-6" />
                  </span>
                )}
              </div>
              {isDropdownOpen && searchResults.length > 0 && (
                <ul className="flight-picker__results" onMouseDown={(e) => e.preventDefault()}>
                  {searchResults.map((flight) => (
                    <li key={flight.number} onClick={() => handleResultClick(flight)}>
                      {flight.airline.code} - {flight.number}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-row items-center gap-2 mt-[0.25rem] rtl:flex-row-reverse">
                <InfoIconSvg />
                <p className="text-[0.75rem]">{t('parkingfeecalculator-flightNumberAllows')}</p>
              </div>
            </div>
          </div>
          <div className="c-parking-fee-form-input">
            <Datepicker
              id="entryDate"
              label={t('parkingfeecalculator-entryDate')}
              value={entryDate}
              icon={<CalendarIconSvg />}
              onChange={(newDate) => setEntryDate(newDate)}
              required
              disablePastDates={true}
            />
            {errors.entryDate && (
              <p className="c-parking-error-text">
                {isPastDate(entryDate)
                  ? ` ${t('parkingfeecalculator-pastDate')}`
                  : ` ${t('parkingfeecalculator-entryDate')} is required`}
              </p>
            )}
          </div>
          <div className="c-parking-fee-form-input">
            <Datepicker
              id="exitDate"
              label={t('parkingfeecalculator-exitDate')}
              value={exitDate}
              icon={<CalendarIconSvg />}
              onChange={(newDate) => setExitDate(newDate)}
              required
              disablePastDates={true}
            />
            {errors.exitDate && (
              <p className="c-parking-error-text">
                {new Date(exitDate) < new Date(entryDate)
                  ? `${t('parkingfeecalculator-beforeEntryDate')}`
                  : ` ${t('parkingfeecalculator-exitDate')} is required`}
              </p>
            )}
          </div>
        </div>
        <div className="c-parking-fee-form__inputs justify-end">
          <div className="c-parking-fee-form-input">
            <Timepicker
              id="entryTime"
              value={entryTime}
              onChange={(time: string) => setEntryTime(time)}
              label={t('parkingfeecalculator-entryTime')}
              use24HourFormat
              required
            />

            {errors.entryTime && (
              <p className="c-parking-error-text">
                {t('parkingfeecalculator-entryTime')} is required
              </p>
            )}
          </div>
          <div className="c-parking-fee-form-input">
            <Timepicker
              id="exitTime"
              value={exitTime}
              onChange={(time: string) => setExitTime(time)}
              label={t('parkingfeecalculator-exitTime')}
              use24HourFormat
              required
            />
            {errors.exitTime && (
              <p className="c-parking-error-text">
                {exitTime === ''
                  ? t('parkingfeecalculator-exitTime') + ' is required'
                  : t('parkingfeecalculator-beforeEntryTime')}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end max-xl:w-full">
        <button
          className="c-parking-fee-form--submit"
          onClick={() => {
            if (validateInputs()) {
              handleSubmit();
            }
          }}
        >
          <Text field={buttonText} />
        </button>
      </div>
    </div>
  );
};

export default ParkingFeeForm;
