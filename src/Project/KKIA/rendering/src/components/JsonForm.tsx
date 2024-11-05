import React from 'react';
import { useForm } from 'react-hook-form';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { RegisterOptions } from 'react-hook-form';

interface JsonFormProps {
  rendering: ComponentRendering;
  fields: {
    data: {
      datasource: {
        title?: { value?: string };
        enableRecaptcha?: { value?: boolean };
        formFieldSchema?: { value?: string };
        submitButtonText?: { value?: string };
      };
    };
  };
}

interface ValidationRules {
  required: string;
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
}

interface Option {
  label: string;
  value: string;
}

interface FormField {
  label: string;
  type: string;
  validation?: ValidationRules;
  options?: Option[];
  rows?: number;
}

const JsonForm = (props: JsonFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm();
  const onSubmit = (data: unknown) => console.log(data);
  const title = props.fields?.data?.datasource?.title?.value;
  const formSchema: FormField[] = JSON.parse(
    props.fields?.data?.datasource?.formFieldSchema?.value || '{}'
  );

  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(formSchema).map(([key, field]) => {
          const { label, type, validation, options, rows } = field;
          const validationRules: RegisterOptions = {
            required: validation?.required ? true : false,
            minLength: validation?.minLength
              ? {
                  value: validation?.minLength?.value,
                  message: validation?.minLength?.message ?? '',
                }
              : undefined,
            maxLength: validation?.maxLength
              ? { value: validation?.maxLength.value, message: validation?.maxLength.message ?? '' }
              : undefined,
            pattern: validation?.pattern
              ? { value: validation.pattern.value, message: validation.pattern.message ?? '' }
              : undefined,
          };

          switch (type) {
            case 'text':
            case 'email':
            case 'number':
              return (
                <div key={key}>
                  <label htmlFor={key}>{label}</label>
                  <input id={key} {...register(key, validationRules)} />
                  {<p>{errors[key]?.message?.toString()}</p>}
                </div>
              );
            case 'textarea':
              return (
                <div key={key}>
                  <label htmlFor={key}>{label}</label>
                  <textarea id={key} rows={rows} {...register(key, validationRules)}></textarea>
                  {<p>{errors[key]?.message?.toString()}</p>}
                </div>
              );
            case 'checkbox':
              return (
                <div key={key}>
                  <input id={key} type="checkbox" {...register(key, validationRules)} />
                  <label htmlFor={key}>{label}</label>
                  {<p>{errors[key]?.message?.toString()}</p>}
                </div>
              );
            case 'select':
              return (
                <div key={key}>
                  <label htmlFor={key}>{label}</label>
                  <select id={key} {...register(key, validationRules)}>
                    {options?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {<p>{errors[key]?.message?.toString()}</p>}
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit">
          {props.fields?.data?.datasource?.submitButtonText?.value || 'Submit'}
        </button>
      </form>
    </>
  );
};

export default JsonForm;
