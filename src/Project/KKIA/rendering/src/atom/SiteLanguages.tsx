import React from 'react';
import { ComponentParams, Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface SiteLanguageFields {
  'Language Name Field': Field<string>;
  'Language Code Field': Field<string>;
  Url: LinkField;
}

export type SiteLanguageProps = {
  params: ComponentParams;
  fields: SiteLanguageFields;
};

export const Default = (props: SiteLanguageProps): JSX.Element => {
  const languageName = props.fields?.['Language Name Field']?.value || 'Unknown Language';
  const url = props.fields?.Url?.value?.href || props.fields?.Url?.value.href || '';

  return (
    <option
      value={url}
      className="bg-background border-none rounded-none !py-5 !px-5 text-muted-darkest text-xs font-normal"
    >
      {languageName}
    </option>
  );
};
