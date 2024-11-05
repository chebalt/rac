import React from 'react';
import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import SectionHeading from 'src/shared-components/SectionHeading';
import { Text14, Text18 } from 'src/shared-components/Texts';

interface App {
  id: string;
  displayName: string;
  fields: {
    Link: LinkField;
    SvgContent: Field<string>;
  };
}

interface FooterAppsProps {
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Apps: App[];
  };
}

const FooterApps: React.FC<FooterAppsProps> = ({ fields }) => {
  return (
    <div>
      {fields.Title?.value && <Text18 field={fields.Title} className="text-white font-bold" />}
      {fields.SubTitle?.value && <Text14 field={fields.SubTitle} className="mb-6 text-white" />}
      <div className="flex flex-wrap overflow-hidden rtl:justify-right">
        {fields.Apps.map((item) => (
          <a
            key={item.id}
            href={item.fields?.Link?.value?.href}
            className={
              fields.Apps.length > 1 ? 'mr-6 my-2 hover:md:opacity-90' : 'hover:md:opacity-90'
            }
          >
            <div className="w-full md:max-w-[426px] ">
              <div
                className="imageContainer w-full h-full"
                dangerouslySetInnerHTML={{ __html: item.fields?.SvgContent?.value }}
              />
              <style jsx>{`
                .imageContainer {
                  svg {
                    width: 100%;
                    height: 100%;
                  }
                }
              `}</style>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterApps;
