import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import {
  Field,
  ComponentRendering,
  TextField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import TextInput from './ui/inputs/TextInput';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import Select from './ui/inputs/Select';
import Checkbox from './ui/checkbox/Checkbox';
import Button from 'src/shared-components/Button';
import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import Datepicker from './ui/datepicker/Datepicker';
import Timepicker from './ui/timepicker/Timepicker';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import TickSvg from 'assets/icons/TickSvg';
import Textarea from './ui/inputs/Textarea';
import DocumentUpload from './ui/inputs/DocumentUpload';
import CallSvg from 'assets/icons/CallSvg';
import Snackbar from './ui/Snackbar';
import Image from 'next/image';
import PrinterSvg from 'assets/icons/PrinterSvg';
import ReCAPTCHA from 'react-google-recaptcha';

import CloseSvg from 'assets/icons/CloseSvg';
import WhatsAppSvg from 'assets/icons/WhatsAppSvg';
import EmailSvg from 'assets/icons/EmailSvg';
import MapSvg from 'assets/icons/MapSvg';
import AskSvg from 'assets/icons/AskSvg';
import CalendarIconSvg from 'assets/icons/CalendarIconSvg';

type ListItem = {
  name: string;
  displayName: string;
  fields: {
    Value: {
      value: string;
    };
  };
};

interface LostLuggageFormProps {
  rendering: ComponentRendering;
  fields: {
    name: Field<string>;
    Category: ListItem[];
    SubCategory: ListItem[];
    Terminal: ListItem[];
    IDType: ListItem[];
    SendButtonText: TextField;
    ClearButtonText: TextField;
    PersonalDetails: TextField;
    SubTitle: TextField;
    ItemDetails: TextField;
    PrintConfirmationText: TextField;
    ViewContactOptionsText: TextField;
    Summary: TextField;
    SuccessSubmitMessage: RichTextField;
    SubmissionFailedMessage: RichTextField;
  };
}

const LostLuggageForm = (props: LostLuggageFormProps): JSX.Element => {
  const { t } = useI18n();
  const { control, handleSubmit, getValues, setValue } = useForm({});
  const { errors } = useFormState({ control });
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const [formId, setFormId] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [uploadedDocuments, setUploadedDocuments] = useState<{ file: File; base64: string }[]>([]);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const [showContactOptionsModal, setShowContactOptionsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const recaptchaRef: any = React.createRef();
  const publicRecaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_SITE_KEY as string;

  const onSubmit = async (data: any) => {
    // Verify reCAPTCHA first
    recaptchaRef.current.reset();
    const token = await recaptchaRef.current.executeAsync();

    if (!token) {
      console.error('No Google reCAPTCHA token generated');
      return;
    }

    const apiQuery: any = await fetch(`/api/verifyCaptcha?response=${token}`);
    const { success } = await apiQuery.json();

    if (!success) {
      console.error('Google reCAPTCHA validation error');
      return;
    }

    if (!getValues('category') || !getValues('subCategory') || !getValues('terminal')) {
      console.error('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('/api/lostLuggageForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setSubmitSuccess(true);
        setStep(3);
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleNextStep = () => {
    if (consent) {
      setConsentError(false);
      handleSubmit(() => setStep(2))();
    } else {
      setConsentError(true);
    }
  };

  useEffect(() => {
    if (getValues('lossDate')) {
      const dateTime = new Date(getValues('lossDate'));
      setDate(dateTime.toISOString().split('T')[0]);
      setTime(dateTime.toTimeString().slice(0, 5));
    }
    //eslint-disable-next-line
  }, []);

  const handleDateChange = (dateString: string) => {
    setDate(dateString);
    if (time) {
      const [hours, minutes] = time.split(':');
      const dateTime = new Date(dateString);
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0);
      setValue('lossDate', dateTime.toISOString());
    }
  };

  const handleTimeChange = (timeString: string) => {
    setTime(timeString);
    if (date) {
      const [hours, minutes] = timeString.split(':');
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0);
      setValue('lossDate', dateTime.toISOString());
    }
  };

  const handleDocumentChange = (files: { file: File; base64: string }[]) => {
    setUploadedDocuments(files);
    setValue('document', files);
  };

  const getTextValue = (list: ListItem[], id: string) => {
    const item = list.find((i) => i.fields.Value.value === id);
    return item ? item.displayName : '';
  };

  const handleSelectToggle = (name: string) => {
    setOpenSelect((prev) => (prev === name ? null : name));
  };

  const onRecaptchaChange = () => {
    // on captcha change
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowContactOptionsModal(false);
      }
    };

    if (showContactOptionsModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContactOptionsModal]);

  return (
    <SectionPaddingWrapper className="py-10 md:py-14 ">
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={publicRecaptchaKey}
            onChange={onRecaptchaChange}
          />
          {step === 1 && (
            <div id="baggage-owner-info">
              <div className="flex flex-col gap-8 pb-8 border-b border-border-secondary mb-6 md:mb-8">
                <h2 className="text-headline-h1 text-text-primary">
                  {t('luggage-baggage-owner-info')}
                </h2>
                <p className="text-text-secondary text-body-medium-regular">
                  {t('form-description')}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-10 pt-14 mb-6 md:mb-8">
                {/* First column */}
                <div className="flex flex-col gap-[53px] w-full md:w-1/2">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'First name is required' }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder={t('forms-first-name')}
                        id="firstName"
                        type="text"
                        label={t('forms-first-name')}
                        required
                        supportingText={t('required-field')}
                        error={!!errors.firstName}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="email"
                        type="email"
                        label={t('forms-email')}
                        placeholder={t('forms-email')}
                        required
                        supportingText={t('required-field')}
                        error={!!errors.email}
                      />
                    )}
                  />

                  <Controller
                    name="selectedIDType"
                    control={control}
                    defaultValue={null}
                    rules={{ required: 'ID type is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        tabs={props.fields?.IDType}
                        onTabClick={field.onChange}
                        placeholder={`Select ${t('luggage-id-type')}`}
                        required
                        isOpen={openSelect === 'selectedIDType'}
                        onToggle={() => handleSelectToggle('selectedIDType')}
                        id="selectedIDType"
                        label={t('luggage-id-type')}
                        supportingText={t('required-field')}
                        error={!!errors.selectedIDType}
                      />
                    )}
                  />
                </div>
                {/* Second column */}
                <div className="flex flex-col gap-[53px] w-full md:w-1/2">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Last name is required' }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="lastName"
                        type="text"
                        label={t('forms-family-name')}
                        placeholder={t('forms-family-name')}
                        required
                        supportingText={t('required-field')}
                        error={!!errors.lastName}
                      />
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="phoneNumber"
                        type="text"
                        label={t('forms-phone-number')}
                        placeholder={t('forms-phone-number')}
                        required
                        supportingText={t('required-field')}
                        error={!!errors.phoneNumber}
                      />
                    )}
                  />
                  <Controller
                    name="idNumber"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'ID number is required' }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="idNumber"
                        type="text"
                        label={t('luggage-id-number')}
                        placeholder={t('luggage-id-number')}
                        required
                        supportingText={t('required-field')}
                        error={!!errors.idNumber}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="py-4">
                <label className="flex items-center gap-2">
                  <Checkbox
                    name="consent"
                    value="consent"
                    checked={consent}
                    id="consent"
                    onChange={() => setConsent(!consent)}
                    label={t('forms-consent')}
                    labelSide="right"
                    className="pl-0"
                    error={consentError}
                  />
                </label>
              </div>
              <div className="flex flex-col items-center md:items-start gap-10 md:flex-row justify-between">
                <div className="hidden md:block w-[71px]"></div>
                <div className="flex items-center gap-8">
                  <span className="text-text-primary text-body-normal-regular">{t('step-1')}</span>
                  <div className="flex items-center">
                    <div className="p-2">
                      <div className="w-8 h-8 rounded-full bg-border-action-primary-default flex justify-center items-center">
                        <div className="w-4 h-4 rounded-full bg-background"></div>
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="w-8 h-8 rounded-full bg-border-action-primary-default flex justify-center items-center">
                        <div className="w-6 h-6 rounded-full bg-background"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={handleNextStep} label="Next step" variant="primary" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div id="lost-items-info">
              <div className="flex flex-col gap-8 pb-8 border-b border-border-secondary mb-6 md:mb-8">
                <h2 className="text-headline-h1 text-text-primary">
                  {t('lost-items-information-title')}
                </h2>
                <p className="text-text-secondary text-body-medium-regular">
                  {t('form-description')}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-10 pt-14 mb-6 md:mb-8">
                {/* First column */}
                <div className="flex flex-col gap-[53px] w-full md:w-1/2">
                  <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        tabs={props.fields?.Category}
                        onTabClick={field.onChange}
                        isOpen={openSelect === 'category'}
                        onToggle={() => handleSelectToggle('category')}
                        id="category"
                        label={t('lost-luggage-category')}
                        error={!!errors.category}
                        supportingText={t('required-field')}
                      />
                    )}
                  />

                  <div className="flex flex-col gap-1">
                    <p
                      className={`text-text-primary text-body-small-regular ${
                        errors.lossDate ? 'text-text-error' : ''
                      }`}
                    >
                      {t('lost-luggage-date')} <span className="text-text-error">*</span>
                    </p>
                    <Controller
                      name="lossDate"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Loss date is required' }}
                      render={({ field }) => (
                        <div className="flex gap-6">
                          <div className="w-1/2 md:w-2/3">
                            <Datepicker
                              value={date}
                              onChange={handleDateChange}
                              id="lossDate"
                              error={!!errors.lossDate}
                              icon={<CalendarIconSvg />}
                            />
                          </div>
                          <div className="w-1/2 md:w-1/3">
                            <Timepicker
                              value={time}
                              onChange={handleTimeChange}
                              use24HourFormat
                              id="lossDateTime"
                              displayIcon={false}
                              error={!!errors.lossDate}
                            />
                          </div>
                        </div>
                      )}
                    />
                    <div className="flex items-center gap-1">
                      <InfoCircleSvg className="text-text-secondary " />
                      <p className="text-text-secondary text-body-extra-small-regular ">
                        {t('required-field')}
                      </p>
                    </div>
                  </div>
                  {/* <div>
                    <span>{t('forms-behind-baggage')}</span>
                    <Controller
                      name="behindBaggage"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="-1">{t('forms-select')}</option>
                          <option value="0">{t('forms-no')}</option>
                          <option value="1">{t('forms-yes')}</option>
                        </select>
                      )}
                    />
                    <span>{t('lost-luggage-apologize-baggage')}</span>
                  </div> */}
                  <div>
                    <Controller
                      name="additionalInformation"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="additionalInformation"
                          label={t('luggage-additional-information')}
                          placeholder={t('luggage-additional-information')}
                        />
                      )}
                    />
                  </div>
                </div>
                {/* Second column */}
                <div className="flex flex-col gap-[53px] w-full md:w-1/2">
                  <Controller
                    name="subCategory"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Subcategory is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        tabs={props.fields?.SubCategory}
                        onTabClick={field.onChange}
                        isOpen={openSelect === 'subCategory'}
                        onToggle={() => handleSelectToggle('subCategory')}
                        id="subCategory"
                        error={!!errors.subCategory}
                        supportingText={t('required-field')}
                        label={t('luggage-sub-category')}
                      />
                    )}
                  />

                  {/* <div>
                    <span>{t('forms-lost-inside-airplane')}</span>
                    <Controller
                      name="lostInsideAirplane"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="-1">{t('forms-select')}</option>
                          <option value="0">{t('forms-no')}</option>
                          <option value="1">{t('forms-yes')}</option>
                        </select>
                      )}
                    />
                    <span>{t('forms-apologize-airplane')}</span>
                  </div>
                  <div>
                    <span>{t('forms-lost-inside-airport')}</span>
                    <Controller
                      name="lostInsideAirport"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field}>
                          <option value="-1">{t('forms-select')}</option>
                          <option value="0">{t('forms-no')}</option>
                          <option value="1">{t('forms-yes')}</option>
                        </select>
                      )}
                    />
                    <span>{t('forms-apologize-airport-premises')}</span>
                  </div> */}

                  <Controller
                    name="terminal"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Terminal is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        tabs={props.fields?.Terminal}
                        onTabClick={field.onChange}
                        isOpen={openSelect === 'terminal'}
                        onToggle={() => handleSelectToggle('terminal')}
                        id="terminal"
                        label={t('lost-at-place')}
                        error={!!errors.terminal}
                        supportingText={t('required-field')}
                      />
                    )}
                  />

                  <div className="flex flex-col gap-1">
                    <p
                      className={`text-text-primary text-body-small-regular ${
                        errors.document ? 'text-text-error' : ''
                      }`}
                    >
                      {t('luggage-upload-document')} <span className="text-text-error">*</span>
                    </p>
                    <Controller
                      name="document"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <DocumentUpload
                          text="Add photo"
                          onChange={handleDocumentChange}
                          value={uploadedDocuments}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center  gap-10 md:flex-row justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
                >
                  <ArrowRightSvg className="rotate-180 text-icon-primary" />
                  {t('forms-back')}
                </button>
                <div className="flex items-center gap-8">
                  <span className="text-text-primary text-body-normal-regular">{t('step-2')}</span>
                  <div className="flex items-center">
                    <div className="p-2">
                      <div className="w-8 h-8 rounded-full bg-border-action-primary-default flex justify-center items-center">
                        <div className="w-4 h-4 rounded-full bg-background">
                          <TickSvg className="text-border-action-primary-default" />
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="w-8 h-8 rounded-full bg-border-action-primary-default flex justify-center items-center">
                        <div className="w-4 h-4 rounded-full bg-background"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button type="submit" variant="primary" label={t('send-button-text')} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div id="final-step">
              <div className="flex flex-col gap-8 pb-8 border-b border-border-secondary mb-8">
                <h2 className="text-headline-h1-2 text-text-primary">{t('summary-title')}</h2>
                <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between">
                  <p className="text-text-secondary text-body-medium-regular">
                    {t('summary-description')}{' '}
                    <span className="text-body-medium-bold text-text-primary">{formId}</span>
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => console.log('print confirmation')}
                      className="flex items-center gap-2 text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
                    >
                      {t('print-confirmation')} <PrinterSvg className="text-icon-primary w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {submitSuccess ? (
                  <Snackbar
                    title={t('submit-success-title')}
                    description={t('submit-success-description')}
                    variant="success"
                  />
                ) : (
                  <Snackbar
                    title={t('submit-error-title')}
                    description={t('submit-error-description')}
                    variant="error"
                  />
                )}
              </div>
              {submitSuccess && (
                <div className="py-8 flex flex-col md:flex-row gap-10">
                  <div className="flex flex-col gap-4 w-1/2">
                    <h5 className="text-body-medium-bold text-text-primary">
                      {t('summary-user-information')}
                    </h5>
                    <div className="flex flex-col gap-4">
                      <p className="text-text-secondary text-body-normal-regular">
                        {t('summary-name')}{' '}
                        <span className="text-text-primary text-body-normal-bold">
                          {getValues('firstName')} {getValues('lastName')}
                        </span>
                      </p>
                      <p className="text-text-secondary text-body-normal-regular">
                        {t('summary-phone')}{' '}
                        <span className="text-text-primary text-body-normal-bold">
                          {getValues('phoneNumber')}
                        </span>
                      </p>
                      <p className="text-text-secondary text-body-normal-regular">
                        {t('summary-email')}{' '}
                        <span className="text-text-primary text-body-normal-bold">
                          {getValues('email')}
                        </span>
                      </p>
                      <p className="text-text-secondary text-body-normal-regular">
                        {t('summary-id-number')}{' '}
                        <span className="text-text-primary text-body-normal-bold">
                          {getValues('idNumber')}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-1/2">
                    <h5 className="text-body-medium-bold text-text-primary">
                      {t('summary-item-information')}
                    </h5>
                    <div className="flex flex-col md:flex-row gap-8">
                      {getValues('document') && getValues('document')[0] && (
                        <div className="w-[144px] h-[144px]">
                          <Image
                            src={getValues('document')[0].base64 || getValues('document')[0].url}
                            alt=""
                            width={144}
                            height={144}
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                        <p className="text-text-secondary text-body-normal-regular">
                          {t('summary-main-category')}{' '}
                          <span className="text-text-primary text-body-normal-bold">
                            {getTextValue(props.fields.Category, getValues('category'))}
                          </span>
                        </p>
                        <p className="text-text-secondary text-body-normal-regular">
                          {t('summary-sub-category')}{' '}
                          <span className="text-text-primary text-body-normal-bold">
                            {getTextValue(props.fields.SubCategory, getValues('subCategory'))}
                          </span>
                        </p>
                        <p className="text-text-secondary text-body-normal-regular">
                          {t('summary-lost-place')}{' '}
                          <span className="text-text-primary text-body-normal-bold">
                            {getTextValue(props.fields.Terminal, getValues('terminal'))}
                          </span>
                        </p>
                        <p className="text-text-secondary text-body-normal-regular">
                          {t('summary-lost-time')}{' '}
                          <span className="text-text-primary text-body-normal-bold">
                            {getValues('lossDate')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 py-10 md:py-14">
                <button
                  type="button"
                  onClick={() => setShowContactOptionsModal(true)}
                  className="hidden md:flex items-center gap-2 text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
                >
                  <CallSvg className="text-icon-primary" />
                  {t('contact-options')}
                </button>
                {submitSuccess ? (
                  <div className="flex items-center justify-center md:justify-start gap-8">
                    <span className="text-text-primary text-body-normal-regular">
                      {t('form-lost-found-sent')}
                    </span>
                    <div className="flex items-center">
                      <div className="p-2">
                        <div className="w-8 h-8 rounded-full bg-border-action-primary-default flex justify-center items-center">
                          <div className="w-4 h-4 rounded-full bg-background">
                            <TickSvg className="text-border-action-primary-default" />
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="w-8 h-8 rounded-full bg-border-action-primary-default flex justify-center items-center">
                          <div className="w-4 h-4 rounded-full bg-background">
                            {' '}
                            <TickSvg className="text-border-action-primary-default" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-text-primary text-body-normal-regular">
                      {t('forms-not-sent')}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowContactOptionsModal(true)}
                  className="flex md:hidden justify-center items-center gap-2 text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
                >
                  <CallSvg className="text-icon-primary" />
                  {t('contact-options')}
                </button>

                <Button type="submit" variant="primary" label={t('button-return-to-home')} />
              </div>
            </div>
          )}
        </form>
        <div
          ref={modalRef}
          className={`absolute inset-0 flex flex-col w-full max-w-[740px] h-full max-h-[736px] z-50 bg-background shadow-default m-auto ${
            showContactOptionsModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between p-8">
            <h4 className="text-body-large-bold text-text-primary">Contact options</h4>
            <div onClick={() => setShowContactOptionsModal(false)} className="cursor-pointer">
              <CloseSvg className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="py-6 px-8 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-surface-secondary">
                <WhatsAppSvg className="text-icon-primary w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-body-normal-regular">
                  Interactive WhatsApp service
                </p>
                <a
                  href="https://wa.me/920020090"
                  className="text-text-primary text-body-large-bold"
                >
                  920020090
                </a>
              </div>
            </div>
            <div className="py-6 px-8 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-surface-secondary">
                <CallSvg className="text-icon-primary w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-body-normal-regular">Call center at</p>
                <a href="tel:+920020090" className="text-text-primary text-body-large-bold">
                  +920020090
                </a>
              </div>
            </div>
            <div className="py-6 px-8 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-surface-secondary">
                <AskSvg className="text-icon-primary w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-body-normal-regular">Ask me team</p>
                <a
                  href="https://wa.me/920020090"
                  className="text-text-primary text-body-large-bold"
                >
                  +920020090
                </a>
              </div>
            </div>
            <div className="py-6 px-8 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-surface-secondary">
                <EmailSvg className="text-icon-primary w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-body-normal-regular">Email address</p>
                <a
                  href="mailto:info@riyadhairports.com"
                  className="text-text-primary text-body-large-bold"
                >
                  info@riyadhairports.com
                </a>
              </div>
            </div>
            <div className="py-6 px-8 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-surface-secondary">
                <MapSvg className="text-icon-primary w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary text-body-normal-regular">
                  Dedicated counter at the airport
                </p>
                <p className="text-text-primary text-body-large-bold">See on a map</p>
              </div>
            </div>
          </div>
          <div className="p-8 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              label="Close"
              onClick={() => setShowContactOptionsModal(false)}
            />
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default LostLuggageForm;
