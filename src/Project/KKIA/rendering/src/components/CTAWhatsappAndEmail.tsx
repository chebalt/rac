import React from 'react';
import {
  Image as JssImage,
  ImageField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import CustomLink from 'src/shared-components/CustomLink';

interface CTAWhatsappAndEmailProps {
  rendering: ComponentRendering;
  fields: {
    Whatsapp: LinkField;
    Email: LinkField;
    'Whatsapp Icon': ImageField;
    'Email Icon': ImageField;
  };
}

const CTAWhatsappAndEmail = (props: CTAWhatsappAndEmailProps): JSX.Element => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <div className="flex gap-4 items-center md:w-1/2  rtl:flex-row-reverse">
        <JssImage field={props.fields['Whatsapp Icon']} className="w-10 h-10" />
        <div className="flex flex-col gap-1">
          <p className="text-body-small-regular text-muted-dark">
            {t('assistanceBanner-whatsapp')}
          </p>
          <CustomLink
            url={props.fields.Whatsapp.value.href}
            title={props.fields.Whatsapp.value.text}
            className="text-body-medium-bold text-muted-darkest"
          />
        </div>
      </div>
      <div className="flex gap-4 items-center md:w-1/2 rtl:flex-row-reverse">
        <JssImage field={props.fields['Email Icon']} className="w-10 h-10" />
        <div className="flex flex-col gap-1">
          <p className="text-body-small-regular text-muted-dark">{t('assistanceBanner-email')}</p>
          <CustomLink
            field={props.fields.Email}
            className="text-body-medium-bold text-muted-darkest"
          />
        </div>
      </div>
    </div>
  );
};

export default CTAWhatsappAndEmail;
