import React from 'react';
import { Placeholder, LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import { DestinationTextImageInfo } from 'src/components/DestinationTextImageInfo';
import { DestinationDetail } from 'src/components/DestinationDetail';
import { TextField, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface AirlinePageProps {
  fields: {
    Name: TextField;
    'Sale Office Location': LinkField;
  };
}

interface DestinationPageFields {
  Title: TextField;
  Image: ImageField;
  'Airport Name': TextField;
  Description: TextField;
  'City Name': TextField;
  Airlines: AirlinePageProps[] | null;
  'Section Heading': TextField;
  'Section Description': TextField;
}

interface RouteFields extends DestinationPageFields {
  [key: string]: unknown;
}

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const DestinationDetailLayout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  return (
    <>
      <div className="manymany">
        <header>
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main>
          {fields ? (
            <>
              <DestinationTextImageInfo
                fields={{
                  Image: fields?.Image || null,
                  Title: fields?.Title || { value: 'No title available' },
                  'Airport Name': fields?.['Airport Name'] || { value: 'No airport name' },
                  Description: fields?.Description || { value: 'No description' },
                }}
              />
              <DestinationDetail
                fields={{
                  'Section Heading': fields?.['Section Heading'] || { value: 'No heading' },
                  'Section Text': fields?.['Section Text'] || {
                    value: 'No description',
                  },
                  Airlines: fields?.Airlines || [],
                }}
              />
            </>
          ) : (
            <p>No data available for this page.</p>
          )}
        </main>
        <footer>
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
    </>
  );
};

export default DestinationDetailLayout;
