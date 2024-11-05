import React from 'react';
import {
  RichTextField,
  RichText as JssRichText,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { CustomRichText } from 'src/shared-components/Texts';

interface FaqRichtextAnswerProps {
  rendering: ComponentRendering;
  fields: {
    Answer: RichTextField;
  };
}

const FaqRichtextAnswer = (props: FaqRichtextAnswerProps): JSX.Element => {
  return <CustomRichText value={props.fields.Answer} />;
};

export default FaqRichtextAnswer;
