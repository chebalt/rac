import React, { useEffect, useRef, useState } from 'react';
import ClockSvg from 'assets/icons/ClockSvg';
import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import DangerIconSvg from 'assets/icons/DangerIconSvg';

type TimepickerProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  use24HourFormat?: boolean;
  displayIcon?: boolean;
  disabled?: boolean;
  supportingText?: string;
  error?: boolean;
};

const Timepicker: React.FC<TimepickerProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  use24HourFormat = false,
  displayIcon = true,
  disabled = false,
  supportingText,
  error = false,
}) => {
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const [selectedHour, setSelectedHour] = useState<string>('12');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [amPm, setAmPm] = useState<string>('AM');
  const timePickerRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (value) {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':');
      setSelectedHour(hours);
      setSelectedMinute(minutes);
      if (period) {
        setAmPm(period.toUpperCase());
      }
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    clickHandler: (value: string) => void,
    value: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      clickHandler(value);
    }
  };

  const handleHourClick = (hourString: string) => {
    setSelectedHour(hourString);
    const updatedTime = `${hourString}:${selectedMinute}`;
    setInputValue(updatedTime);
    onChange(updatedTime);
  };

  const handleMinuteClick = (minuteString: string) => {
    setSelectedMinute(minuteString);
    const updatedTime = `${selectedHour}:${minuteString}`;
    setInputValue(updatedTime);
    onChange(updatedTime);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (timePickerRef.current && !timePickerRef.current.contains(event.relatedTarget as Node)) {
      setShowTimePicker(false);
    }
  };

  const handleAmPmClick = (value: string) => {
    setAmPm(value);
    updateInputValue(selectedHour, selectedMinute, value);
  };

  const updateInputValue = (hour: string, minute: string, period: string) => {
    let timeString = '';

    if (use24HourFormat) {
      if (period === 'PM' && hour !== '12') {
        hour = (parseInt(hour) + 12).toString().padStart(2, '0');
      } else if (period === 'AM' && hour === '12') {
        hour = '00';
      }
      timeString = `${hour}:${minute}`;
    } else {
      timeString = `${hour}:${minute} ${period}`;
    }

    setInputValue(timeString);
    onChange(timeString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9:]/g, '');

    if (value.length === 2 && !value.includes(':')) {
      value = value + ':';
    }

    const [hours, minutes] = value.split(':');

    if (hours && parseInt(hours) > 23) {
      value = '23:' + (minutes || '');
    }

    if (minutes && parseInt(minutes) > 59) {
      value = (hours || '00') + ':59';
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    setInputValue(value);
    onChange(value);
  };

  const generateHourOptions = (): JSX.Element[] => {
    const hours: JSX.Element[] = [];
    const maxHour = use24HourFormat ? 23 : 12;
    const minHour = use24HourFormat ? 0 : 1;

    for (let hour = minHour; hour <= maxHour; hour++) {
      const hourString = use24HourFormat
        ? hour.toString().padStart(2, '0')
        : hour === 0
        ? '12'
        : hour.toString().padStart(2, '0');
      hours.push(
        <div
          key={hourString}
          tabIndex={0}
          className={`cursor-pointer text-center text-text-primary py-2 transition-all ${
            selectedHour === hourString
              ? 'bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-body-normal-bold'
              : 'hover:bg-surface-action-tertiary-default active:bg-surface-action-tertiary-press text-body-normal-regular'
          } focus:outline-none focus:shadow-outline ${
            disabled ? 'cursor-not-allowed text-text-disabled' : ''
          } `}
          onClick={() => handleHourClick(hourString)}
          onKeyDown={(e) => handleKeyDown(e, handleHourClick, hourString)}
        >
          {hourString}
        </div>
      );
    }
    return hours;
  };

  const generateMinuteOptions = (): JSX.Element[] => {
    const minutes: JSX.Element[] = [];
    for (let minute = 0; minute < 60; minute += 15) {
      const minuteString = minute.toString().padStart(2, '0');
      minutes.push(
        <div
          key={minuteString}
          tabIndex={0}
          className={`cursor-pointer text-center text-text-primary py-2 transition-all ${
            selectedHour === minuteString
              ? 'bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-body-normal-bold'
              : 'hover:bg-surface-action-tertiary-default active:bg-surface-action-tertiary-press text-body-normal-regular'
          } focus:outline-none focus:shadow-outline ${
            disabled ? 'cursor-not-allowed text-text-disabled' : ''
          } `}
          onClick={() => handleMinuteClick(minuteString)}
          onKeyDown={(e) => handleKeyDown(e, handleMinuteClick, minuteString)}
        >
          {minuteString}
        </div>
      );
    }
    return minutes;
  };

  return (
    <label
      className="w-full flex flex-col gap-1 relative rtl:text-right"
      htmlFor={id}
      ref={timePickerRef}
    >
      {label ||
        (required && (
          <p
            className={`text-text-primary text-body-small-regular ${
              error ? 'text-text-error' : ''
            }`}
          >
            {label} <span className="text-text-error">{required && '*'}</span>
          </p>
        ))}
      <div
        className={`relative h-14 ${label || required ? 'mt-1' : ''}`}
        onBlur={handleBlur}
        tabIndex={-1}
      >
        {displayIcon && (
          <ClockSvg className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 text-icon-secondary" />
        )}
        <input
          id={id}
          className={`p-4 w-full h-14 box-border rtl:text-right ${
            displayIcon ? 'pl-12 rtl:pr-12' : ''
          }  bg-surface-action-tertiary-default hover:bg-surface-action-tertiary-hover 
            active:bg-surface-action-tertiary-press disabled:bg-surface-action-disabled 
            border-b border-border-action-tertiary-default hover:border-border-action-tertiary-hover 
            active:border-border-action-tertiary-press placeholder:text-text-secondary 
            text-text-primary text-body-normal-regular placeholder:text-body-normal-regular
            focus:outline-none focus:shadow-outline ${
              error ? 'border-border-error bg-surface-error' : ''
            }`}
          type="text"
          placeholder="-- : --"
          value={inputValue}
          onFocus={() => setShowTimePicker(true)}
          onChange={handleInputChange}
          required={required}
          autoComplete="off"
        />
        {!use24HourFormat && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700">
            {amPm}
          </span>
        )}
        {showTimePicker && (
          <div
            className={`absolute z-10 p-4 bg-background shadow-pressed rtl:right-0 ${
              use24HourFormat ? 'w-[181px]' : 'w-[231px]'
            } h-[272px] flex gap-5 max-md:w-full `}
          >
            <div className="overflow-y-auto full timepicker-scroll w-1/3 max-w-[50px]">
              {generateHourOptions()}
            </div>

            <div className=" w-1/3 max-w-[50px]">{generateMinuteOptions()}</div>

            {!use24HourFormat && (
              <div className="flex flex-col w-1/3 max-w-[50px]">
                <div
                  className={`cursor-pointer text-center text-text-primary py-2 transition-all ${
                    amPm === 'AM'
                      ? 'bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-body-normal-bold'
                      : 'hover:bg-surface-action-tertiary-default active:bg-surface-action-tertiary-press text-body-normal-regular'
                  } focus:outline-none focus:shadow-outline ${
                    disabled ? 'cursor-not-allowed text-text-disabled' : ''
                  } `}
                  onClick={() => handleAmPmClick('AM')}
                >
                  AM
                </div>
                <div
                  className={`cursor-pointer text-center text-text-primary py-2 transition-all ${
                    amPm === 'PM'
                      ? 'bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-body-normal-bold'
                      : 'hover:bg-surface-action-tertiary-default active:bg-surface-action-tertiary-press text-body-normal-regular'
                  } focus:outline-none focus:shadow-outline ${
                    disabled ? 'cursor-not-allowed text-text-disabled' : ''
                  } `}
                  onClick={() => handleAmPmClick('PM')}
                >
                  PM
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {supportingText && (
        <div className="flex items-center gap-1">
          {error ? (
            <DangerIconSvg className="text-icon-error" />
          ) : (
            <InfoCircleSvg className="text-icon-secondary" />
          )}
          <p
            className={`text-text-secondary text-body-extra-small-regular ${
              error ? 'text-text-error' : ''
            }`}
          >
            {supportingText}
          </p>
        </div>
      )}
    </label>
  );
};

export default Timepicker;
