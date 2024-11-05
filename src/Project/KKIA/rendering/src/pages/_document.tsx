import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export const Document = (props: { __NEXT_DATA__: { locale: string } }) => {
  const getDirectionByLocale = (locale: string) => {
    if (locale == 'ar-sa') {
      return 'RTL';
    }

    return 'LTR';
  };

  const direction = getDirectionByLocale(props.__NEXT_DATA__.locale);

  return (
    <Html dir={direction}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/jquery.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/jquery.cookie.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/toolkit.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/signsplayer.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/tooltip_add.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/mr_advwinr1.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/Latest/mrmegapack.bundle.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/MRUAP/riyadhairports/integrator-uap.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.mindrocketsapis.com/client/riyadhairports/integrator.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
};

export default Document;
