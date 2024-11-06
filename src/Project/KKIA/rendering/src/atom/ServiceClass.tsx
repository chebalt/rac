import React from 'react';
import { Text as JssText, TextField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import TickSvg from 'src/assets/icons/TickSvg';
import CustomLink from 'src/shared-components/CustomLink';

interface FeatureFields {
  fields: {
    Text: TextField;
  };
}

export interface ServiceClassFields {
  Name: TextField;
  Description: TextField;
  Price: TextField;
  Features: FeatureFields[];
  Link: LinkField;
}

export type ServiceClassProps = {
  fields: ServiceClassFields;
};

const ServiceClass = (props: ServiceClassProps): JSX.Element => {
  const { t } = useI18n();

  return (
    <div className="md:bg-jade-light border border-jade-dark p-8">
      <div className="flex flex-col md:flex-row md:justify-between gap-6 pb-6 border-b border-muted-variant mb-6">
        <div className="flex flex-col gap-2">
          <div>
            <JssText
              field={props.fields.Name}
              tag="h4"
              className="text-jade-darkest text-xl font-bold"
            />
          </div>
          <div>
            <JssText
              field={props.fields.Description}
              tag="p"
              className="text-muted-darker font-light text-base"
            />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <JssText
              field={props.fields.Price}
              tag="span"
              className="text-jade-darkest text-5xl font-bold"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-jade-darkest font-bold text-sm">
              {t('chauffeurServiceClasses-sar')}
            </div>
            <div className="text-muted-darker font-normal text-xs">
              {t('chauffeurServiceClasses-perPassenger')}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="font-bold text-jade-darkest text-xl">
          {t('chauffeurServiceClasses-features')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {props.fields.Features?.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="min-w-6 w-6 h-6 bg-jade-light flex items-center justify-center rounded-full">
                <TickSvg className="text-jade-darkest" />
              </div>
              <JssText
                field={feature.fields.Text}
                tag="p"
                className="text-jade-darkest font-light text-base"
              />
            </div>
          ))}
        </div>
      </div>

      <CustomLink
        className="bg-surface-action-primary-default hover:bg-surface-action-primary-hover active:bg-surface-action-primary-press text-jade-darker font-normal text-lg py-4 w-full flex items-center justify-center"
        field={props.fields.Link}
      />
    </div>
  );
};

export default ServiceClass;
