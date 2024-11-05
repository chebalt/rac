import React, { useEffect, useRef, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import ChevronDownSvg from 'assets/icons/ChevronUpDown';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';
import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import DangerIconSvg from 'assets/icons/DangerIconSvg';

type DatepickerProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  disablePastDates?: boolean;
  supportingText?: string;
  icon: JSX.Element;
};

const Datepicker: React.FC<DatepickerProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  error = false,
  disabled = false,
  disablePastDates = false,
  supportingText,
  icon,
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        setShowCalendar(false);
      }, 200);
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      document.getElementById(id)?.addEventListener('blur', handleBlur);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
        document.getElementById(id)?.removeEventListener('blur', handleBlur);
      }
    };
  }, [id]);

  const generateCalendarDays = (): {
    date: Date;
    isCurrentMonth: boolean;
    isDisabled: boolean;
  }[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(currentYear, currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentYear, currentMonth.getMonth() + 1, 0);
    const days: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }[] = [];

    const startDayOfWeek = startOfMonth.getDay();
    const daysFromPrevMonth = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    for (let i = daysFromPrevMonth; i > 0; i--) {
      const prevMonthDate = new Date(currentYear, currentMonth.getMonth(), 1 - i);

      days.push({
        date: new Date(currentYear, currentMonth.getMonth(), 1 - i),
        isCurrentMonth: false,
        isDisabled: disablePastDates && prevMonthDate < today,
      });
    }

    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const currentDate = new Date(currentYear, currentMonth.getMonth(), day);
      currentDate.setHours(0, 0, 0, 0);

      days.push({
        date: new Date(currentYear, currentMonth.getMonth(), day),
        isCurrentMonth: true,
        isDisabled: disablePastDates && currentDate < today,
      });
    }

    const endDayOfWeek = endOfMonth.getDay();
    const daysFromNextMonth = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;

    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonthDate = new Date(currentYear, currentMonth.getMonth() + 1, i);
      days.push({
        date: new Date(currentYear, currentMonth.getMonth() + 1, i),
        isCurrentMonth: false,
        isDisabled: disablePastDates && nextMonthDate < today,
      });
    }

    return days;
  };

  const handleDateClick = (date: Date): void => {
    onChange(format(date, 'yyyy-MM-dd'));
    setTimeout(() => {
      setShowCalendar(false);

      if (typeof window !== 'undefined') {
        document.getElementById(id)?.blur();
      }
    }, 0);
  };

  const handleNextMonth = (): void => {
    const nextMonth = currentMonth.getMonth() + 1;
    if (nextMonth > 11) {
      setCurrentMonth(new Date(currentYear + 1, 0));
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const handlePrevMonth = (): void => {
    const prevMonth = currentMonth.getMonth() - 1;
    if (prevMonth < 0) {
      setCurrentMonth(new Date(currentYear - 1, 11));
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleYearSelect = (year: number): void => {
    setCurrentYear(year);
    setIsYearDropdownOpen(false);
  };

  const generateYearOptions = (): JSX.Element[] => {
    const options: JSX.Element[] = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      options.push(
        <div
          key={year}
          className={`cursor-pointer text-center text-text-primary p-2 transition-all ${
            year === currentYear
              ? 'bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-body-normal-bold'
              : 'hover:bg-surface-action-tertiary-default active:bg-surface-action-tertiary-press text-body-normal-regular'
          } focus:outline-none focus:shadow-outline ${
            disabled ? 'cursor-not-allowed text-text-disabled' : ''
          } `}
          onClick={() => handleYearSelect(year)}
        >
          {year}
        </div>
      );
    }
    return options;
  };

  return (
    <label className="w-full relative flex flex-col gap-1 rtl:text-right" ref={calendarRef}>
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
      <div className="relative h-14">
        <div className="relative flex items-center w-full h-14">
          <div className="absolute left-4 rtl:right-4 rtl:left-auto">{icon}</div>
          <input
            id={id}
            className={`date-input cursor-pointer truncate rtl:text-right ${
              icon ? 'pl-12 rtl:pr-12' : 'pl-4'
            } pr-10 rtl:pl-10 h-14`}
            type="text"
            placeholder={placeholder || 'Select a date'}
            value={value}
            onFocus={() => setShowCalendar(true)}
            readOnly
            required={required}
          />
          <div className="absolute right-4 rtl:left-4 rtl:right-auto flex items-center">
            {showCalendar ? (
              <ChevronUpSvg className="w-6 h-6" />
            ) : (
              <ChevronDownSvg className="w-6 h-6" />
            )}
          </div>
        </div>
        {showCalendar && (
          <div className="calendar-drawer">
            <div className="calendar-header">
              <div className="flex items-center gap-[0.5rem]">
                <span className="text-[1rem]">{format(currentMonth, 'MMMM')}</span>
                <div className="relative">
                  <button
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    className="year-selector focus:outline-none flex items-center gap-[0.5rem]"
                  >
                    {currentYear}
                    {isYearDropdownOpen ? <ChevronUpSvg /> : <ChevronDownSvg />}
                  </button>
                  {isYearDropdownOpen && (
                    <div className="absolute bg-background mt-1 z-10 max-h-60 overflow-y-auto">
                      {generateYearOptions()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex font-bold items-center gap-[0.5rem]">
                <button onClick={handlePrevMonth}>{'<'}</button>
                <button onClick={handleNextMonth}>{'>'}</button>
                <div className="md:hidden flex ml-4">
                  <button onClick={() => setTimeout(() => setShowCalendar(false), 0)}>
                    <img src="/icons/close.svg" alt="close datepicker" />
                  </button>
                </div>
              </div>
            </div>
            <div className="calendar-days">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className="calendar-day-name">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map(({ date, isCurrentMonth, isDisabled }, index) => (
                <div
                  key={index}
                  className={`calendar-day ${!isCurrentMonth ? 'text-gray-400' : ''} ${
                    isDisabled ? 'bg-surface-on-action-disabled' : ''
                  } ${value === format(date, 'yyyy-MM-dd') ? 'selected-day' : ''}`}
                  onClick={!isDisabled ? () => handleDateClick(date) : undefined}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
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

export default Datepicker;
