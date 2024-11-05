import React from 'react';
import { ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Text as JssText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

export interface ApplicationPushInstructionFields {
  AppLogo: ImageField;
  AppName: TextField;
  FirstStep: TextField;
  SecondStep: TextField;
  ThirdStep: TextField;
  FourthStep: TextField;
  FifthStep: TextField;
}

export type ApplicationPushInstructionProps = {
  fields: ApplicationPushInstructionFields;
};

const ApplicationPushInstruction = ({ fields }: ApplicationPushInstructionProps): JSX.Element => {
  const renderSteps = () => {
    const steps = [
      fields.FirstStep,
      fields.SecondStep,
      fields.ThirdStep,
      fields.FourthStep,
      fields.FifthStep,
    ].filter((step) => step && step.value);

    return steps.map((step, index) => (
      <React.Fragment key={index}>
        <JssText field={step} />
        {index < steps.length - 1 && <span> &gt; </span>}{' '}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex items-center space-x-2">
      {fields.AppLogo && <JssImage field={fields.AppLogo} className="w-6 h-6" />}

      {fields.AppName && (
        <span className="font-semibold">
          <JssText field={fields.AppName} />:
        </span>
      )}

      <div className="flex items-center text-gray-500">{renderSteps()}</div>
    </div>
  );
};

export default ApplicationPushInstruction;
