import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { ReactNode } from 'react';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

export default function CustomLink({
  url,
  title,
  field,
  className,
  children,
}: {
  url?: string;
  title?: string;
  field?: LinkField;
  className?: HTMLElement['className'];
  children?: ReactNode;
}) {
  const {
    sitecoreContext: { language },
  } = useSitecoreContext();
  const langagePrefix = `/${language}`;

  const addLanguagePrefix = (path: string) => {
    return path && path.startsWith('/') ? `${langagePrefix}${path}` : path;
  };

  const addHttps = (path: string) => {
    return path && path.startsWith('http') ? path : `https://${path}`;
  };

  const hasLanguageSegment = (path: string): boolean => {
    // Regular expression to match /xx-xx/ at the beginning of the pathname
    const languageSegmentRegex = /^\/[a-z]{2}(?:-[a-z]{2})?\//i;
    const match = path.match(languageSegmentRegex);
    return match !== null;
  };

  if (field) {
    let href = field.value.href || '';
    if (field.value.querystring) {
      href += field.value.querystring;
    }
    if (field.value.anchor) {
      href += `#${field.value.anchor}`;
    }
    if (!hasLanguageSegment(href)) {
      href = addLanguagePrefix(href);
    }

    let linkDisplay = field.value.title || '';
    if (linkDisplay === '') {
      linkDisplay = field.value.text || '';
    }

    return (
      <Link className={className} href={href}>
        {children || linkDisplay}
      </Link>
    );
  }

  if (!url) {
    return null;
  }

  if (url.startsWith('/')) {
    let urlWithLang = url;

    if (!hasLanguageSegment(urlWithLang)) {
      urlWithLang = addLanguagePrefix(urlWithLang);
    }

    return (
      <Link className={className} href={urlWithLang}>
        {children || title}
      </Link>
    );
  }

  const urlWithHttps = addHttps(url);
  return (
    <Link className={className} href={urlWithHttps}>
      {children || title}
    </Link>
  );
}
