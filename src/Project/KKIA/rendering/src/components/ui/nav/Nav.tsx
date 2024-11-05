import React, { useEffect, useState } from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NavGroup from './NavGroup';
import { useRouter } from 'next/router';

type NavProps = {
  title: {
    value: string;
  };
  links?: {
    displayName: string;
    link: {
      link: {
        value: {
          href: string;
          text: string;
          id: string;
        };
      };
    };
  }[];
  linkHref?: string;
  isMobileView: boolean;
  toggleMobileMenu?: () => void;
};

const chevronUp = (
  <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const chevronDown = (
  <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const Nav: React.FC<NavProps> = ({ title, links, isMobileView, toggleMobileMenu, linkHref }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const toggleNavGroup = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleMobile = () => {
    setShowMobile((prev) => !prev);
  };

  useEffect(() => {
    if (linkHref) {
      setIsActive(router.asPath === linkHref);
    }
  }, [router.asPath, linkHref]);

  return (
    <>
      <button
        className="c-nav__btn"
        onClick={isMobileView ? toggleMobile : undefined}
        onMouseEnter={!isMobileView ? toggleNavGroup : undefined}
        onMouseLeave={!isMobileView ? toggleNavGroup : undefined}
      >
        <ul className={`c-nav ${isOpen ? 'c-nav--active' : ''}`}>
          <li className="c-nav__item">
            <div className="flex items-center gap-[0.25rem] text-muted-darker rtl:justify-end">
              {links?.length === 0 ? (
                <a href={linkHref} className="c-nav__item--link">
                  <Text
                    field={title}
                    tag="span"
                    className={`c-nav__item--title ${
                      isActive ? 'text-body-normal-bold !text-primary-dark-green' : ''
                    }`}
                  />
                </a>
              ) : (
                <div className="flex items-center gap-[0.25rem] rtl:flex-row-reverse">
                  <Text field={title} tag="span" className="c-nav__item--title rtl:!text-left" />
                  {!isMobileView ? (
                    links && (isOpen ? chevronUp : chevronDown)
                  ) : (
                    <button>
                      <img src="/icons/chevron-right.svg" alt="arrow right" />
                    </button>
                  )}
                </div>
              )}
            </div>
            {!isMobileView && isOpen && links && <NavGroup links={links} />}
          </li>
        </ul>
      </button>
      <div
        className={`c-nav__mobile-menu ${
          links && links.length > 0 && showMobile
            ? 'c-nav__mobile-menu--open'
            : 'c-nav__mobile-menu--close'
        }`}
      >
        {isMobileView && showMobile && links && links.length > 0 && (
          <>
            <div className="relative p-[1rem] border-b-2 border-muted-variant w-full flex justify-between items-center bg-background">
              <button onClick={toggleMobile} className="c-weather__back-button">
                <img src="/icons/chevron-left.svg" alt="back to main menu" />
              </button>
              <h6 className="font-bold text-center text-jade-darkest">Submenu</h6>
              <button onClick={toggleMobileMenu}>
                <img src="/icons/close.svg" alt="close menu" />
              </button>
            </div>
            <ul className="c-nav-item">
              <li className="c-nav-item__content rtl:text-end">
                <a href={linkHref} className="c-nav-item__content--link text-jade-darkest">
                  <Text field={title} tag="span" className="c-nav__item--title" />
                </a>
              </li>
            </ul>
            <NavGroup links={links} />
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
