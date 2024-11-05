import { Field, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import React, { useState } from 'react';
import LinkListItem from 'src/atom/LinkList';
import { useFormik } from 'formik';
import { contactFormSchema } from 'src/validation/schemas';
import PrimaryTextInput from 'src/shared-components/PrimaryTextInput';
import { IContactForm } from 'src/types/forms.type';
import { Text32 } from 'src/shared-components/Texts';
import SecondaryButton from 'src/shared-components/SecondaryButton';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  rendering: ComponentRendering;
  fields: {
    name: Field<string>;
    InquiryType: LinkListItem[];
    'Send Button Text': TextField;
    'Clear Button Text': TextField;
  };
}

const ContactForm = (props: ContactFormProps): JSX.Element => {
  const { t } = useI18n();
  const [userMessage, setUserMessage] = useState<null | JSX.Element>(null);
  const [inquiryType, setInquiryType] = useState<string>('');
  const recaptchaRef: any = React.createRef();
  const publicRecaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_SITE_KEY as string;

  const { handleSubmit, values, handleBlur, handleChange, touched, errors } =
    useFormik<IContactForm>({
      initialValues: {
        nameFamilyName: '',
        email: '',
        phoneNumber: '',
        message: '',
      },
      validationSchema: contactFormSchema,
      onSubmit: (values) => submit(values),
    });

  const { nameFamilyName, email, message, phoneNumber } = values;

  async function submit(values: IContactForm) {
    const errorText = (
      <span className="text-red-400">An error occurred. Please try again later.</span>
    );

    try {
      recaptchaRef.current.reset();
      const token = await recaptchaRef.current.executeAsync();

      if (token) {
        const apiQuery: any = await fetch(`/api/verifyCaptcha?response=${token}`);
        const { success } = await apiQuery.json();

        if (success) {
          const response = await fetch('/api/contactForm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values, inquiryType }),
          });

          if (response.ok) {
            setUserMessage(<span className="text-green-400">Your message has been sent!</span>);
          } else {
            setUserMessage(errorText);
          }
        } else {
          setUserMessage(errorText);
        }
      } else {
        setUserMessage(errorText);
      }
    } catch (error) {
      setUserMessage(errorText);
    }
  }

  const onRecaptchaChange = () => {
    // on captcha change
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col max-w-[576px] bg-jade-light p-14">
      <Text32 field={props.fields.name} hasMarginBottom />
      <LinkListItem
        items={props.fields?.InquiryType}
        label={t('inquiry-type')}
        changeInquiryType={(item) => setInquiryType(item)}
      />
      <PrimaryTextInput
        label={`${t('forms-first-name')} & ${t('forms-family-name')}`}
        onChangeText={handleChange('nameFamilyName')}
        onBlur={handleBlur('nameFamilyName')}
        value={nameFamilyName}
        error={touched.nameFamilyName && errors.nameFamilyName}
        placeholder="Enter full name"
      />
      <PrimaryTextInput
        label={t('forms-email')}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={email}
        error={touched.email && errors.email}
        placeholder="Enter email"
      />
      <PrimaryTextInput
        label={t('forms-phone-number')}
        onChangeText={handleChange('phoneNumber')}
        onBlur={handleBlur('phoneNumber')}
        value={phoneNumber}
        error={touched.phoneNumber && errors.phoneNumber}
        placeholder="Enter phone number"
      />
      <PrimaryTextInput
        label={t('forms-message')}
        onChangeText={handleChange('message')}
        onBlur={handleBlur('message')}
        value={message}
        error={touched.message && errors.message}
        textarea
        placeholder="Write your message"
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={publicRecaptchaKey}
        onChange={onRecaptchaChange}
      />
      <div
        //@ts-expect-error //@ts-ignore
        onClick={handleSubmit}
      >
        <SecondaryButton field={props.fields['Send Button Text']} />
      </div>
      <div className="h-6 w-full text-lg">{userMessage}</div>
    </div>
  );
};

export default ContactForm;
