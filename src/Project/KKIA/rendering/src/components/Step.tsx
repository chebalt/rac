import React from 'react';
import {
  TextField,
  RichTextField,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
  ComponentRendering,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface StepProps {
  rendering: ComponentRendering;
  fields: {
    Number: TextField;
    Text: TextField;
    Actions: RichTextField;
    Image: ImageField;
    Icon: ImageField;
  };
}

const Step = (props: StepProps): JSX.Element => {
  const hasText = props.fields.Text.value?.toString() !== '';

  return (
    <>
      {props.fields?.Image &&
      props.fields.Image.value &&
      Object.keys(props.fields.Image.value).length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4 rtl:flex-row-reverse">
          <JssImage
            field={props.fields.Image}
            className="w-full h-[224px] md:max-w-[397px] object-cover flex-shrink-0"
          />
          <div className="flex flex-col md:items-center gap-2">
            <div className="w-12 h-12 bg-surface-secondary flex justify-center items-center rounded-full shrink-0">
              <JssText
                field={props.fields.Number}
                tag="p"
                className="text-body-large-regular text-text-secondary"
              />
            </div>
            <div className="hidden md:block border-border-tertiary border-2 w-[1px] flex-grow"></div>
          </div>
          <div className="flex flex-col gap-4 pb-10 md:pb-0 ">
            {hasText && (
              <div className="flex gap-2 pt-2">
                {props.fields?.Icon &&
                  props.fields.Icon.value &&
                  Object.keys(props.fields.Icon.value).length > 0 && (
                    <JssImage field={props.fields.Icon} className="w-7 h-7" />
                  )}
                <JssText
                  field={props.fields.Text}
                  tag="h3"
                  className="text-body-medium-bold text-text-primary"
                />
              </div>
            )}
            <JssRichText field={props.fields.Actions} />
          </div>
        </div>
      ) : (
        <div className="flex gap-6">
          <div>
            <JssImage field={props.fields.Image} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-surface-secondary flex justify-center items-center rounded-full shrink-0">
              <JssText
                field={props.fields.Number}
                tag="p"
                className="text-body-large-regular text-text-secondary"
              />
            </div>

            <div className="border-border-tertiary border-2 w-[1px] flex-grow"></div>
          </div>

          <div>
            {hasText && (
              <div>
                <JssImage field={props.fields.Icon} />
                <JssText
                  field={props.fields.Text}
                  tag="h3"
                  className="text-body-medium-bold text-text-primary"
                />
              </div>
            )}

            <JssRichText field={props.fields.Actions} />
            <div className="border-t border-border-secondary w-full my-8"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Step;
