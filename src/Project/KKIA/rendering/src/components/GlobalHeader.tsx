import {
  Placeholder,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { cn } from 'lib/cn';
import { useEffect, useState } from 'react';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import GlobalSearch from './GlobalSearch';

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
  const phKeyBreadcrumbs = `kkia-navigation-breadcrumbs-${props.params.DynamicPlaceholderId}`;
  const phKeyMobile = `kkia-navigation-mobile-${props.params.DynamicPlaceholderId}`;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className={cn('flex flex-col w-full relative', 'component-content')}>
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
      <SectionPaddingWrapper>
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
      </SectionPaddingWrapper>
      <GlobalSearch isSearchOpen={isSearchOpen} />
    </div>
  );
};

export default GlobalHeader;
