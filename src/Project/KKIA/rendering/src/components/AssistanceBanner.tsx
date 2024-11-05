import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface AssistanceBannerFields {
  Title: TextField;
  Description: TextField;
  Image: ImageField;
  Whatsapp: LinkField;
  Email: LinkField;
  'Whatsapp Icon': ImageField;
  'Email Icon': ImageField;
}

interface AssistanceBannerProps {
  rendering: ComponentRendering;
  fields: AssistanceBannerFields;
}

const AssistanceBanner = (props: AssistanceBannerProps): JSX.Element => {
  const { t } = useI18n();

  return (
    <div className="bg-jade-light py-14">
      <SectionPaddingWrapper>
        <div className="flex items-center gap-24 max-xl:flex-col max-xl:gap-12">
          <JssImage
            className="max-h-[297px] xl:w-[516px] object-cover "
            field={props.fields.Image}
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-jade-darkest font-bold">
                <JssText field={props.fields.Title} />
              </h3>
              <p className="text-muted-darker">
                <JssText field={props.fields.Description} />
              </p>
            </div>
            <div className="flex gap-10 flex-wrap">
              <div className="flex items-center gap-4">
                <JssImage field={props.fields['Whatsapp Icon']} />
                <div>
                  <div>{t('assistanceBanner-whatsapp')}</div>
                  <h5 className="font-bold">
                    <JssLink field={props.fields.Whatsapp} />
                  </h5>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <JssImage field={props.fields['Email Icon']} />
                <div>
                  <div>{t('assistanceBanner-email')}</div>
                  <h5 className="font-bold">
                    <JssLink field={props.fields.Email} />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionPaddingWrapper>
    </div>
  );
};

export default AssistanceBanner;
