import React, { useState } from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Collapsible from 'react-collapsible';
import clsx from 'clsx';
import PlusIconSvg from 'assets/icons/PlusIconSvg';

type DatasourceResult = {
  title: {
    value: string;
  };
  children?: {
    results: DataSourceLink[];
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
      };
    };
  };
};

type FooterMenuProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        children: {
          results: DatasourceResult[];
        };
      };
    };
  };
};

const FooterMenu: React.FC<FooterMenuProps> = ({ fields }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!fields) return null;

  const toggleCollapsible = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <nav className="text-white py-4">
      <div className="hidden md:flex">
        {fields?.data?.datasource?.children?.results?.map((item, index) => (
          <div key={index} className="mr-10 rtl:text-right">
            <span>
              <Text field={item.title} tag="span" />
            </span>
            <ul>
              {item.children?.results?.map((childItem, index) => (
                <li key={index} className="hover:md:opacity-90">
                  <a href={childItem.link?.link?.value?.href}>
                    <span className="text-sm">
                      {(childItem.link?.link?.value?.text || '').trim() === ''
                        ? childItem?.displayName
                        : childItem.link?.link?.value?.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        {fields?.data?.datasource?.children?.results?.map((item, index) => (
          <div
            key={index}
            className={clsx(
              'flex border-b border-b-1 border-[#FFFFFF50] py-4 w-full justify-between',
              {
                'border-t border-t-1': index === 0,
              }
            )}
            onClick={() => toggleCollapsible(index)}
          >
            <Collapsible open={openIndex === index} trigger={item.title.value} className="w-full">
              <ul>
                {item.children?.results?.map((childItem, index) => (
                  <li key={index} className="active:opacity-50">
                    <a href={childItem.link?.link?.value?.href}>
                      <span className="text-sm">
                        {(childItem.link?.link?.value?.text || '').trim() === ''
                          ? childItem?.displayName
                          : childItem.link?.link?.value?.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Collapsible>
            <div className="text-white text-xl">
              <PlusIconSvg />
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default FooterMenu;
