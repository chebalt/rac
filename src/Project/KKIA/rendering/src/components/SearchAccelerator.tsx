import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSitecoreContext, LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';

// This component is used to set the page-id and page-type meta tags for the page to help Sitecore Search in indexing the page.
// See the Sitecore Search Accelerator implementation for more details.

interface SearchAcceleratorProps {
  layoutData: LayoutServiceData;
}

const SearchAccelerator: React.FC<SearchAcceleratorProps> = ({ layoutData }) => {
  const targetHostname = process.env.TARGET_HOSTNAME || '';

  const { sitecoreContext } = useSitecoreContext();
  const { route } = layoutData.sitecore;

  const pageId = route?.itemId || '';
  const pageType = route?.templateName || '';
  const metaDescription = (route?.fields?.MetaDescription as { value: string })?.value || '';
  const oGTitle = (route?.fields?.OGTitle as { value: string })?.value || '';
  const oGDescription = (route?.fields?.OGDescription as { value: string })?.value || '';
  const oGImage = (route?.fields?.OGImage as { value: { src: string } })?.value?.src || '';
  const canonicalURLFromRoute = (route?.fields?.CanonicalURL as { value: string })?.value || '';
  const schemaMarkup = (route?.fields?.SchemaMarkup as { value: string })?.value || '';

  const [baseUrl, setBaseUrl] = useState<string>(targetHostname);

  useEffect(() => {
    if (typeof window !== 'undefined' && targetHostname === '') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const generateCanonicalURL = (): string => {
    let itemPath = String(sitecoreContext.itemPath);

    if (!itemPath.startsWith('/')) {
      itemPath = `/${itemPath}`;
    }

    if (itemPath !== '/' && itemPath.endsWith('/')) {
      itemPath = itemPath.slice(0, -1);
    }

    return baseUrl + itemPath;
  };

  const canonicalURL = canonicalURLFromRoute || generateCanonicalURL();

  return (
    <Head>
      <meta name="page-id" content={pageId} />
      <meta name="page-type" content={pageType} />
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta name="og:title" content={oGTitle} />
      {oGDescription && <meta name="og:description" content={oGDescription} />}
      {oGImage && <meta property="og:image" content={oGImage} />}
      <link rel="canonical" href={canonicalURL} />
      {schemaMarkup && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaMarkup }} />
      )}
    </Head>
  );
};

export default SearchAccelerator;
