// 'use client';
// import { useState } from 'react';

// import HeaderTop from 'components/molecules/HeaderTop';
// import HeaderBottom from 'components/molecules/HeaderBottom';
// import MobileMenu from 'components/molecules/MobileMenu';
// import SearchDrawer from 'components/molecules/SearchDrawer';
// import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

// interface Language {
//   value: {
//     code: string;
//     name: string;
//   };
// }

// interface Weather {
//   value: {
//     city: string;
//     temperature: string;
//   };
// }

// interface GlobalHeaderProps {
//   props: {
//     fields: {
//       languages: Language[];
//       weather: Weather;
//       kkiaLink: LinkField;
//       logo: LinkField;
//       links: LinkField[];
//     };
//   };
// }

// export default function GlobalHeader({ props }: GlobalHeaderProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleSearchDrawer = () => {
//     setIsSearchOpen(!isSearchOpen);
//   };

//   return (
//     <>
//       {/* Desktop header */}
//       <div className="relative hidden w-full flex-col md:flex">
//         <HeaderTop props={props} />
//         <HeaderBottom
//           setIsOpen={toggleMobileMenu}
//           toggleSearchDrawer={toggleSearchDrawer}
//           isSearchOpen={isSearchOpen}
//           props={props.fields}
//         />
//         <SearchDrawer isOpen={isSearchOpen} />
//       </div>
//       {/* Mobile header */}
//       <div className="flex w-full flex-col md:hidden">
//         <HeaderBottom
//           setIsOpen={toggleMobileMenu}
//           toggleSearchDrawer={toggleSearchDrawer}
//           isSearchOpen={isSearchOpen}
//           props={props.fields}
//         />
//         <div className="relative w-full">
//           <SearchDrawer isOpen={isSearchOpen} />
//         </div>
//         <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} props={props.fields} />
//       </div>
//     </>
//   );
// }

import {
  Placeholder,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState } from 'react';
import Container from 'components/atoms/Container';

interface GlobalHeaderProps {
  rendering: ComponentRendering;
  params: ComponentParams;
}

const GlobalHeader = (props: GlobalHeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        if (window.innerWidth <= 1023) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    return;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (isMobileMenuOpen) return;

      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition === 0) {
        setIsScrollingUp(true);
      } else if (currentScrollPosition < lastScrollPosition) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition, isMobileMenuOpen]);

  const phKeyUtilityMenu = `kkia-navigation-utilitymenu-${props.params.DynamicPlaceholderId}`;
  const phKeyMainMenu = `kkia-navigation-mainmenu-${props.params.DynamicPlaceholderId}`;
  const phKeyMobile = `kkia-navigation-mobile-${props.params.DynamicPlaceholderId}`;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className={'flex flex-col w-full relative component-content'}>
      <div className="hidden h-8 bg-jade-light lg:block">
        <div className="w-[90%] xl:w-full max-w-[1320px] mx-auto h-full">
          <div className="flex justify-end w-full h-full rtl:flex-row-reverse">
            <Placeholder
              name={phKeyUtilityMenu}
              rendering={props.rendering}
              renderingContext={{ isMobileMenuOpen }}
            />
          </div>
        </div>
      </div>
      <Container>
        <div
          className={`c-global-header ${isMobile ? (isScrollingUp ? 'visible' : 'hidden') : ''}`}
        >
          <Placeholder
            name={phKeyMainMenu}
            rendering={props.rendering}
            renderingContext={{ isMobileMenuOpen, toggleMobileMenu, toggleSearch, isSearchOpen }}
          />

          <div
            className={`c-global-header__mobile ${
              isMobileMenuOpen ? 'c-global-header__mobile--open' : 'c-global-header__mobile--close'
            }`}
          >
            <div className="flex flex-col justify-start w-full h-screen">
              <div className="c-global-header__mobile--header">
                <h6 className="font-bold !text-center text-jade-darkest">Menu</h6>
                <button onClick={toggleMobileMenu}>
                  <img src="/icons/close.svg" alt="close menu" />
                </button>
              </div>
              <Placeholder
                name={phKeyMobile}
                rendering={props.rendering}
                renderingContext={{ isMobileMenuOpen, toggleMobileMenu }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GlobalHeader;
