import React from 'react';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowDown from 'assets/icons/ArrowDown';
import CustomLink from 'src/shared-components/CustomLink';

type ManualStep = {
  fields: {
    Icon: ImageField;
    Text: TextField;
    Link: LinkField;
  };
};

interface ManualProps {
  rendering: ComponentRendering;
  fields?: {
    ManualSteps?: ManualStep[];
  };
}

const Manual = (props: ManualProps): JSX.Element => {
  const steps = props.fields?.ManualSteps || [];

  return (
    <div className="flex flex-col gap-4">
      {props.fields?.ManualSteps?.map((step, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3 px-4 py-3 bg-surface-secondary md:items-center">
            <div className="w-12 h-12 rounded-full bg-surface-primary flex items-center justify-center">
              <JssImage
                field={step.fields.Icon}
                className="w-full h-full text-icon-primary fill-icon-primary"
              />
            </div>
            <JssText
              field={step.fields.Text}
              tag="p"
              className="text-body-medium-light text-text-secondary"
            />
            <CustomLink
              field={step.fields.Link}
              className="text-body-medium-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
            />
          </div>
          {index !== (props.fields?.ManualSteps?.length ?? 0) - 1 && (
            <ArrowDown className="w-8 h-8 text-icon-secondary ml-7" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Manual;
