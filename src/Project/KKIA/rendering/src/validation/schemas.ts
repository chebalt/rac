import { IContactForm } from 'src/types/forms.type';
import { email, message, fullName, phoneNumber } from './validators';
import * as yup from 'yup';

export const contactFormSchema = yup.object<IContactForm>({
  nameFamilyName: fullName,
  email,
  phoneNumber,
  message,
});
