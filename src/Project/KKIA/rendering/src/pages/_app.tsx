import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Init from 'src/Init';
import client from 'apollo-client'; // Import the Apollo Client instance
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { SearchProvider } from '../contexts/SearchContext'; // Import the SearchProvider

import { WidgetsProvider } from '@sitecore-search/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IsSearchEnabled, SEARCH_CONFIG } from 'src/common/search';
import { LanguageContext } from 'src/contexts/LanguageContext';
import useLanguage from 'src/hooks/useLanguage';

import 'assets/main.scss';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const { language, setLanguage } = useLanguage();

  const SearchWrapper = ({ children }: any) =>
    IsSearchEnabled() ? (
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <QueryClientProvider client={queryClient}>
          <WidgetsProvider {...SEARCH_CONFIG}>{children}</WidgetsProvider>
        </QueryClientProvider>
      </LanguageContext.Provider>
    ) : (
      children
    );

  return (
    <ApolloProvider client={client}>
      <SearchWrapper>
        <SearchProvider>
          <Init {...pageProps} />
          <I18nProvider lngDict={dictionary} locale={language || pageProps.locale}>
            <Component {...rest} />
          </I18nProvider>
        </SearchProvider>
      </SearchWrapper>
    </ApolloProvider>
  );
}

export default App;
