import * as yup from 'yup';

export const fullName = yup.string().required('required field');

export const address = yup.string().required('required field');

export const postCode = yup
  .string()
  .matches(/\d{2}-\d{3}/, 'Zip code must be in xx-xxx format')
  .required('required field');

export const city = yup.string().required('required field');

export const email = yup
  .string()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
  .required('required field');

export const phoneNumber = yup
  .string()
  .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be in E.164 format')
  .required('required field');

export const message = yup.string().required('required field');
