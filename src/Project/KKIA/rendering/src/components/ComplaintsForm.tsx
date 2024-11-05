import { Text, Field, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import React, { useState } from 'react';
import LinkListItem from 'src/atom/LinkList';

interface ComplaintsFormProps {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    Category: LinkListItem[];
    Terminal: LinkListItem[];
    'Send Button Text': TextField;
    'Clear Button Text': TextField;
  };
}

const ComplaintsForm = (props: ComplaintsFormProps): JSX.Element => {
  const { t } = useI18n();
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowSuccessMessage(false);
    try {
      const response = await GetTicketNumber();
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMessage(data.ticketId);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
      setShowSuccessMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  async function GetTicketNumber() {
    const response = fetch('/api/complaintsForm', {
      method: 'POST',
      cache: 'no-store',
    });
    console.log(response);
    return response;
  }

  return (
    <div className={`component`}>
      <div className="component-content">
        <p>ComplaintsForm Component</p>
        <Text field={props.fields?.Title} />
        <div>
          <span>{t('complaints-form-title')}</span>
        </div>
        <div>
          <span>{t('required-field')}</span>
          <LinkListItem
            items={props.fields?.Category}
            label={t('complaints-form-category')}
            changeInquiryType={() => {
              console.log('changeInquiryType');
            }}
          />
        </div>
        <div>
          <span>{t('forms-first-name')}</span>
          <input
            name="FName"
            type="text"
            title="Enter name"
            placeholder={t('forms-first-name')}
          ></input>
          <span>{t('required-field')}</span>
        </div>
        <div>
          <span>{t('forms-family-name')}</span>
          <input
            name="FamName"
            type="text"
            title="Enter name"
            placeholder={t('forms-family-name')}
          ></input>
          <span>{t('required-field')}</span>
        </div>
        <div>
          <span>{t('forms-email')}</span>
          <input name="Email" type="text" title="Enter name" placeholder={t('forms-email')}></input>
          <span>{t('required-field')}</span>
        </div>
        <div>
          <span>{t('forms-phone-number')}</span>
          <input
            name="PNumber"
            type="text"
            title="Enter name"
            placeholder={t('forms-phone-number')}
          ></input>
          <span>{t('required-field')}</span>
        </div>
        <div>
          <span>{t('flight-number')}</span>
          <input
            name="FNumber"
            type="text"
            title="Enter name"
            placeholder={t('flight-number')}
          ></input>
          <span>{t('required-field')}</span>
        </div>
        <div>
          <span>{t('required-field')}</span>
          <LinkListItem
            items={props.fields?.Terminal}
            label={t('luggage-terminal')}
            changeInquiryType={() => {
              console.log('changeInquiryType');
            }}
          />
        </div>
        <div>
          <span>{t('luggage-loss-date')}</span>
          <span>{t('required-field')}</span>
          <input
            type="datetime-local"
            id="start"
            name="trip-start"
            value="2018-07-22"
            min="2024-01-01"
            max="2026-12-31"
          />
        </div>
        <div>
          <span>{t('message')}</span>
          <span>{t('max-char')}</span>
          <span>{t('required-field')}</span>
        </div>
        <div className={`form-container ${showSuccessMessage ? 'visible' : ''}`}>
          <button onClick={handleSubmit} disabled={isLoading}>
            <Text field={props.fields['Send Button Text']} />
            {isLoading ? 'Loading...' : 'Generate TicketID'}
          </button>
          {showSuccessMessage && <p>Ticket ID is {message}</p>}
        </div>
        <div>
          <button>
            <Text field={props.fields['Clear Button Text']} />
          </button>
        </div>
        <div>
          <span>{t('success-message')}</span>
        </div>
        <div>
          <span>{t('failed-message')}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsForm;
