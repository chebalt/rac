import React from 'react';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Nav from 'components/atoms/Nav';
import Close from 'components/icons/Close';
import Search from 'components/icons/Search';

type DatasourceResult = {
  title: {
    value: string;
  };
  children?: {
    results: DataSourceLink[];
  };
  link?: {
    link: {
      value: {
        href: string;
      };
    };
  };
};

type DataSourceLink = {
  name: string;
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
};

type MainNavigationProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        children: {
          results: DatasourceResult[];
        };
      };
    };
  };
  renderingContext: {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    toggleSearch: () => void;
    isSearchOpen: boolean;
  };
};

const MainNavigation: React.FC<MainNavigationProps> = ({ fields, renderingContext = {} }) => {
  const {
    isMobileMenuOpen = false,
    toggleMobileMenu,
    toggleSearch,
    isSearchOpen,
  } = renderingContext;

  return (
    <nav className="c-global-header__main-navigation" role="navigation">
      {!isMobileMenuOpen && (
        <>
          <button onClick={toggleSearch} className="w-10 h-10 p-2 md:hidden">
            {isSearchOpen ? <Close /> : <Search />}
          </button>

          <button className="c-global-header__mobile-button" onClick={toggleMobileMenu}>
            <img src="/icons/menu-burger.svg" alt="menu burger" />
          </button>
        </>
      )}

      {isMobileMenuOpen && (
        <div className="flex flex-col w-full">
          {fields?.data?.datasource?.children?.results?.map((item, index) => (
            <Nav
              key={index}
              title={item.title}
              links={item.children?.results ?? []}
              linkHref={item.link?.link.value.href}
              isMobileView={true}
              toggleMobileMenu={toggleMobileMenu}
            />
          ))}{' '}
        </div>
      )}

      <div className="hidden lg:flex flex-row items-center max-2xl:gap-[0.725rem] gap-[2rem] rtl:flex-row-reverse">
        {fields?.data?.datasource?.children?.results?.map((item, index) => (
          <Nav
            key={index}
            title={item.title}
            links={item.children?.results ?? []}
            linkHref={item.link?.link.value.href}
            isMobileView={false}
            toggleMobileMenu={toggleMobileMenu}
          />
        ))}
        <button onClick={toggleSearch} className="w-10 h-10 p-2">
          {isSearchOpen ? <Close /> : <Search />}
        </button>
      </div>
    </nav>
  );
};

export default withDatasourceCheck()<MainNavigationProps>(MainNavigation);
