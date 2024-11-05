// components/FlightDetailLayout.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import localFont from 'next/font/local';
import { cn } from 'lib/cn';
import SearchAccelerator from 'src/components/SearchAccelerator';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useSearch } from 'src/contexts/SearchContext';

const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const frutigerLTAArabic = localFont({
  src: [
    {
      path: './assets/font/FrutigerLTArabic/FrutigerLTArabic45Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './assets/font/FrutigerLTArabic/FrutigerLTArabic55Roman.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/font/FrutigerLTArabic/FrutigerLTArabic65Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './assets/font/FrutigerLTArabic/frutigerltarabic75black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-frutiger',
  display: 'swap',
});

const FlightDetailLayout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const { flight, setFlight } = useSearch();

  useEffect(() => {
    const storedFlight = localStorage.getItem('flight');
    if (storedFlight) {
      setFlight(JSON.parse(storedFlight));
    }
  }, [flight, setFlight]);

  useEffect(() => {
    console.log('FLIGHT DETAIL LAYOUT - flight:', flight);
  }, [flight]);
  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}

        {/* Inject the global accessibility function */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.activateAccessibility = function (type) {

                switch(type) {
                  case 'biggerText':
                    console.log('Bigger text activated');
                    break;
                  case 'smallerText':
                    console.log('Smaller text activated');
                    break;
                  case 'signLanguage':
                    console.log('Sign language activated');
                    break;
                  case 'colorInversion':
                    console.log('Color inversion activated');
                    break;
                  default:
                    console.log('Unknown accessibility function');
                }
              };
              console.log('activateAccessibility function declared');
            `,
          }}
        />
      </Head>

      {/* Add the SearchAccelerator component */}
      <SearchAccelerator layoutData={layoutData} />
      <div className={cn(mainClassPageEditing, frutigerLTAArabic.className)}>
        <header>
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main>
          <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
        </main>
        <footer>
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
      <SpeedInsights />
    </>
  );
};

export default FlightDetailLayout;
