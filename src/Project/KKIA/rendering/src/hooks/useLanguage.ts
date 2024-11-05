import { useEffect } from 'react';

import locales from 'src/data/locales';
import useStorage from 'src/hooks/useStorage';
import { PageController } from '@sitecore-search/react';

/**
 * Custom hook for managing the language state.
 * This hook synchronizes the language state with the local storage and updates the language settings in the PageController context.
 * @returns An object containing the current language and a function to update the language.
 */
function useLanguage() {
  const [language, setLanguage] = useStorage('lang', 'en');
  useEffect(() => {
    setLanguage(language);
    PageController.getContext().setLocaleLanguage(language);
    PageController.getContext().setLocaleCountry(locales[language].country);
  }, [language, setLanguage]);
  return { language, setLanguage };
}

export default useLanguage;
