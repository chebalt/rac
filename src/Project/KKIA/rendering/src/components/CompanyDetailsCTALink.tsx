import React from 'react';
import {
  Text as JssText,
  Link as JssLink,
  Image as JssImage,
  TextField,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SecondaryButton from 'src/shared-components/SecondaryButton';

interface CompanyDetailsCTALinkFields {
  Title: TextField;
  Description: TextField;
  Link: LinkField;
  Image: ImageField;
}

interface CompanyDetailsCTALinkProps {
  fields: CompanyDetailsCTALinkFields;
}

const CompanyDetailsCTALink = (props: CompanyDetailsCTALinkProps): JSX.Element => {
  const { Title, Description, Link, Image } = props.fields;
  const hasImage = !props.fields.Image.value?.src?.includes('default_image');

  return (
    <div className="bg-surface-quaternary w-full md:max-w-[400px]">
      {hasImage && (
        <div>
          <JssImage field={props.fields.Image} />
        </div>
      )}
      <div className="p-6 flex flex-col gap-5">
        <JssText field={Title} tag="h3" className="text-text-primary text-body-large-bold" />

        <JssText
          field={Description}
          tag="p"
          className="text-text-secondary text-body-normal-light"
        />
        <SecondaryButton field={props.fields.Link} />
      </div>
    </div>
  );
};

export default CompanyDetailsCTALink;
