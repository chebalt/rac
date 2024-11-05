import React from 'react';

type FormInputProps = {
  id: string;
  type: 'date' | 'time' | 'text' | 'email';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  imgSrc?: string;
  imgAltText?: string;
  placeholder?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  value,
  onChange,
  label,
  imgSrc,
  imgAltText,
  required = false,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-[0.875rem] text-muted-darkest mb-[0.25rem]" htmlFor={id}>
        {label} {required && '*'}
      </label>
      <div>
        {imgSrc && (
          <img
            className="w-[24px] h-[24px] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            src={imgSrc}
            alt={imgAltText}
          />
        )}
        <input
          className="c-parking-fee-form-input--input"
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
