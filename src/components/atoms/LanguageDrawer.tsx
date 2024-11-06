// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

// import ArrowTip from '../icons/ArrowTip';
// import clsx from 'clsx';
// import LanguageEnglish from '../icons/LanguageEnglish';
// import LanguageArabic from '../icons/LanguageArabic';

// export interface LanguageDrawerProps {
//   /** The open state of the language drawer */
//   isOpen: boolean;
//   /** The toggle drawer handler */
//   toggleDrawer: () => void;
//   /** The list of languages to display */
//   languages: Array<{
//     code: string;
//     name: string;
//   }>;
// }

// /**
//  * A component that displays a language drawer
//  */
// export default function LanguageDrawer({ isOpen, toggleDrawer, languages }: LanguageDrawerProps) {
//   const router = useRouter();
//   const { sitecoreContext } = useSitecoreContext();
//   const [currentLanguage, setCurrentLanguage] = useState(
//     sitecoreContext.language || languages[0]?.code || ''
//   );

//   const handleLanguageChange = (languageCode: string) => {
//     setCurrentLanguage(languageCode);

//     const currentPath = router.asPath;
//     const newPath = `/${languageCode}${currentPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '')}`;

//     router.push(newPath, newPath, { locale: languageCode });
//   };

//   const languageItem = (language: { code: string; name: string }, index: number) => {
//     const isCurrentLanguage = language.code === currentLanguage;
//     return (
//       <div
//         key={index}
//         className={clsx(
//           'flex cursor-pointer items-center gap-2 px-5 py-4 focus:shadow-outline focus:outline-none',
//           isCurrentLanguage
//             ? 'bg-surface-action-secondary-default hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
//             : 'bg-surface-primary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press'
//         )}
//         onClick={() => handleLanguageChange(language.code)}
//       >
//         {language.code === 'en' ? <LanguageEnglish /> : <LanguageArabic />}
//         <span
//           className={clsx(
//             isCurrentLanguage
//               ? 'text-body-extra-small-bold text-text-action-primary-default'
//               : 'text-body-extra-small-regular text-text-primary'
//           )}
//         >
//           {language.name}
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div
//       className="text-body-extra-small-regular hover:text-text-action-secondary-hover active:text-text-action-secondary-press relative flex cursor-pointer items-center gap-1 px-4 py-2 uppercase text-text-action-secondary-default"
//       onClick={toggleDrawer}
//     >
//       {currentLanguage}
//       <ArrowTip
//         className={clsx('h-4 w-4 transition-transform', {
//           'rotate-180': isOpen,
//         })}
//       />
//       <div
//         className={clsx(
//           'absolute right-0 top-full z-30 flex h-auto w-fit flex-col justify-between bg-surface-primary shadow-pressed',
//           { hidden: !isOpen }
//         )}
//       >
//         <div className="flex flex-col">
//           {languages.map((language, index) => languageItem(language, index))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteLanguageFields } from './SiteLanguages';
import { Icon } from 'components/atoms/Icons';

interface SiteLanguageItemFields {
  'Site Languages': Array<SiteLanguages>;
}

interface SiteLanguages {
  fields: SiteLanguageFields;
}

type LanguageDrawerProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: SiteLanguageItemFields;
  renderingContext: {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
  };
};

const getLanguageSegment = (pathname: string): string => {
  // Regular expression to match /xx-xx/ at the beginning of the pathname
  const languageSegmentRegex = /^\/[a-z]{2}(?:-[a-z]{2})?\//i;
  const match = pathname.match(languageSegmentRegex);
  return match ? match[0] : '/';
};

export const Default = (props: LanguageDrawerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isMobileMenuOpen, toggleMobileMenu } = props.renderingContext;
  const siteLanguages = props.fields['Site Languages'];

  const [selectedLanguageName, setSelectedLanguageName] = useState('EN');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const pathFromWindow = typeof window !== 'undefined' ? window.location.pathname : '';
    const firstSegment = pathFromWindow.split('/').filter(Boolean)[0] || '';
    const languageSegment = getLanguageSegment(`/${firstSegment}/`);
    const selectedLanguage = siteLanguages.find(
      (x) => x.fields.Url?.value?.href == languageSegment
    );

    if (languageSegment === '/' || selectedLanguage === undefined) {
      setSelectedLanguageName('EN');
    } else {
      const languageCode = selectedLanguage.fields['Language Code Field']?.value;
      setSelectedLanguageName(languageCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!siteLanguages) {
    return (
      <div className={`component ${props.params.styles}`} id={id || undefined}>
        <div className="component-content">
          <p>No languages available</p>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (url: string | undefined) => {
    if (url) {
      const pathFromWindow = typeof window !== 'undefined' ? window.location.pathname : '';
      const firstSegment = pathFromWindow.split('/').filter(Boolean)[0] || '';
      const homePath = getLanguageSegment(`/${firstSegment}/`);

      const furtherSegments =
        homePath === '/'
          ? pathFromWindow
          : pathFromWindow.split('/').filter(Boolean).slice(1).join('/');

      const newPath = `${url}${furtherSegments}`;

      setIsDrawerOpen(false);
      setIsDropdownOpen(false);
      if (toggleMobileMenu) toggleMobileMenu();

      window.location.href = newPath;
    }
  };

  return (
    <div className={`c-language ${props.params.styles}`} id={id || undefined}>
      {!isMobileMenuOpen && (
        <div className="relative w-full h-full" ref={dropdownRef}>
          <button
            className="w-full lg:h-full px-4 bg-jade-light outline-none border-none rounded-none focus:bg-background flex items-center justify-between gap-1"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>{selectedLanguageName}</span>
            <Icon
              type="polygonDown"
              size={8}
              className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 min-w-full bg-white z-[10000]" role="listbox">
              {siteLanguages.map((language, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setSelectedLanguageName(
                        language.fields['Language Code Field'].value.toUpperCase()
                      );
                      handleLanguageChange(language.fields.Url.value?.href);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {language.fields['Language Name Field'].value}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsDrawerOpen(true)}
            className="w-full flex items-center justify-between py-[1rem]"
          >
            <button className="c-language__toggle-btn text-jade-darkest">Language</button>
            <img src="/icons/chevron-right.svg" alt="submenu" />
          </div>
          <div
            className={`c-language__drawer ${
              isDrawerOpen ? 'c-language__drawer--open' : 'c-language__drawer--close'
            }`}
          >
            {isDrawerOpen && (
              <>
                <div className="c-language__drawer-header">
                  <button onClick={() => setIsDrawerOpen(false)} className="c-weather__back-button">
                    <img src="/icons/chevron-left.svg" alt="back to main menu" />
                  </button>
                  <h6 className="font-bold text-center text-jade-darkest">Languages</h6>
                  <button onClick={toggleMobileMenu}>
                    <img src="/icons/close.svg" alt="close menu" />
                  </button>
                </div>
                <div className="c-language__content">
                  <span className="font-bold py-[1rem] text-jade-darkest text-[0.875rem]">
                    Language options
                  </span>
                  <div className="c-language__options">
                    {siteLanguages.map((language, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLanguageChange(language.fields.Url.value?.href)}
                        className="c-language__button text-jade-darkest rtl:text-end"
                      >
                        {language.fields['Language Name Field'].value}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
