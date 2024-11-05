import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Flight } from 'src/pages/api/flightsInformation';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  flightType: string;
  setFlightType: (type: string) => void;
  flight: Flight | null;
  setFlight: (flight: Flight) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [flightType, setFlightType] = useState<string>('arrival');
  const [flight, setFlight] = useState<Flight | null>(null);
  const hasInitializedSearchTerm = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasInitializedSearchTerm.current && router.isReady) {
      if (router.query.search) {
        setSearchTerm(router.query.search as string);
      }
      hasInitializedSearchTerm.current = true;
    }
  }, [router.isReady]);
  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, flightType, setFlightType, flight, setFlight }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
