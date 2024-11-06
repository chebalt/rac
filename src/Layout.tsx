/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

import localFont from 'next/font/local';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
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

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={`${mainClassPageEditing} ${frutigerLTAArabic.variable}`}>
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
    </>
  );
};

export default Layout;
