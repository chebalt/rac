'use client';
import { useState } from 'react';

import HeaderTop from 'components/molecules/HeaderTop';
import HeaderBottom from 'components/molecules/HeaderBottom';
import MobileMenu from 'components/molecules/MobileMenu';
import SearchDrawer from 'components/molecules/SearchDrawer';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Language {
  value: {
    code: string;
    name: string;
  };
}

interface Weather {
  value: {
    city: string;
    temperature: string;
  };
}

interface GlobalHeaderProps {
  props: {
    fields: {
      languages: Language[];
      weather: Weather;
      kkiaLink: LinkField;
      logo: LinkField;
      links: LinkField[];
    };
  };
}

export default function GlobalHeader({ props }: GlobalHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearchDrawer = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {/* Desktop header */}
      <div className="relative hidden w-full flex-col md:flex">
        <HeaderTop props={props} />
        <HeaderBottom
          setIsOpen={toggleMobileMenu}
          toggleSearchDrawer={toggleSearchDrawer}
          isSearchOpen={isSearchOpen}
          props={props.fields}
        />
        <SearchDrawer isOpen={isSearchOpen} />
      </div>
      {/* Mobile header */}
      <div className="flex w-full flex-col md:hidden">
        <HeaderBottom
          setIsOpen={toggleMobileMenu}
          toggleSearchDrawer={toggleSearchDrawer}
          isSearchOpen={isSearchOpen}
          props={props.fields}
        />
        <div className="relative w-full">
          <SearchDrawer isOpen={isSearchOpen} />
        </div>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} props={props.fields} />
      </div>
    </>
  );
}
