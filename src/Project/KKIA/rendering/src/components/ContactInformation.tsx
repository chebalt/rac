import React from 'react';
import { Text, Field, ComponentRendering, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CallSvg from 'assets/icons/CallSvg';
import WhatsAppSvg from 'assets/icons/WhatsAppSvg';
import EmailSvg from 'assets/icons/EmailSvg';
import PinSvg from 'assets/icons/PinSvg';
import ContactItem from './ui/contacts/ContactItem';
import ContactCard from './ui/contacts/ContactCard';

interface ContactInformationProps {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Description: Field<string>;
    PhoneNumber: LinkField;
    WhatsApp: LinkField;
    Email: LinkField;
    Address: LinkField;
    FirstCardTitle: Field<string>;
    FirstCardDescription: Field<string>;
    FirstCardLink: LinkField;
    SecondCardTitle: Field<string>;
    SecondCardDescription: Field<string>;
    SecondCardLink: LinkField;
  };
}

const ContactInformation = (props: ContactInformationProps): JSX.Element => {
  return (
    <div className="mb-10 lg:mb-0 w-full lg:w-1/2">
      <div className="flex flex-col gap-14 ">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="font-normal text-xs text-muted-darker">
              <Text field={props.fields.Title} />
            </div>
            <div className="font-bold text-[2rem] text-jade-darkest">
              <Text field={props.fields.SubTitle} />
            </div>
          </div>
          <div className="font-light text-lg text-muted-darker">
            <Text field={props.fields.Description} />
          </div>
        </div>
        <div className="flex flex-col gap-6 mb-8">
          <ContactItem
            icon={<CallSvg className="text-primary-dark-green" />}
            label={props.fields.PhoneNumber.value.text || ''}
            value={props.fields.PhoneNumber.value.href?.replace('http://', '') || ''}
            href={props.fields.PhoneNumber.value.href || ''}
          />
          <ContactItem
            icon={<WhatsAppSvg className="text-primary-dark-green" />}
            label={props.fields.WhatsApp.value.text || ''}
            value={props.fields.WhatsApp.value.href?.replace('http://', '') || ''}
            href={props.fields.WhatsApp.value.href || ''}
          />
          <ContactItem
            icon={<EmailSvg className="text-primary-dark-green" />}
            label={props.fields.Email.value.text || ''}
            value={props.fields.Email.value.href?.replace('mailto:', '') || ''}
            href={props.fields.Email.value.href || ''}
          />
          <ContactItem
            icon={<PinSvg className="text-primary-dark-green" />}
            label={props.fields.Address.value.text || ''}
            value={props.fields.Address.value.href?.replace('http://', '') || ''}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactCard
            title={props.fields.FirstCardTitle}
            description={props.fields.FirstCardDescription}
            link={props.fields.FirstCardLink}
          />
          <ContactCard
            title={props.fields.SecondCardTitle}
            description={props.fields.SecondCardDescription}
            link={props.fields.SecondCardLink}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
