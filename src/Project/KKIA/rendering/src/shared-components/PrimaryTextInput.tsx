import clsx from 'clsx';
import { ReactNode } from 'react';
import { Text12, Text14 } from './Texts';

interface IPrimaryTextInput {
  label?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  value?: string;
  icon?: ReactNode;
  error?: undefined | string | boolean;
  onBlur?: (e: any) => void;
  password?: boolean;
  disabled?: boolean;
  textarea?: boolean;
}

const PrimaryTextInput = ({
  label,
  placeholder,
  onChangeText,
  value,
  icon,
  error,
  onBlur,
  password,
  disabled,
  textarea,
}: IPrimaryTextInput) => {
  const inputStyles = clsx(
    'w-full px-4 py-2 text-base bg-background-dark',
    'border-b border-gray-background-variant',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    {
      'border-red-500': error,
      'bg-gray-200': disabled,
      'pl-10': icon,
      'resize-none': textarea,
    }
  );

  return (
    <div className="w-full text-jade-darkest">
      {label && (
        <div className="mb-2 capitalize">
          <Text14>{label}</Text14>
        </div>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        {textarea ? (
          <textarea
            className={inputStyles}
            placeholder={placeholder}
            onChange={(e) => onChangeText(e.target.value)}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
            rows={4}
          />
        ) : (
          <input
            type={password ? 'password' : 'text'}
            className={inputStyles}
            placeholder={placeholder}
            onChange={(e) => onChangeText(e.target.value)}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
          />
        )}
      </div>
      <div className="h-6 flex items-center justify-end w-full">
        <Text12 className="text-red-500">
          {error && (typeof error === 'string' ? error : 'Invalid input')}
        </Text12>
      </div>
    </div>
  );
};

export default PrimaryTextInput;
