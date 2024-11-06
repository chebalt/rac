import React, { useState } from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Plus from 'components/icons/Plus';
import { Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';

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
                  <JssLink field={childItem.link?.link}>
                    <span className="text-sm">
                      {(childItem.link?.link?.value?.text || '').trim() === ''
                        ? childItem?.displayName
                        : childItem.link?.link?.value?.text}
                    </span>
                  </JssLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        {fields?.data?.datasource?.children?.results?.map((item, index) => (
          <div key={index} className="border-b border-[#FFFFFF50]">
            <div
              className="flex cursor-pointer items-center justify-between py-4"
              onClick={() => toggleCollapsible(index)}
            >
              <span className="text-white text-xl">{item.title.value}</span>
              <Plus
                className={`h-6 w-6 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>
            {openIndex === index && (
              <div className="flex flex-col gap-4 pb-4">
                <ul>
                  {item.children?.results?.map((childItem, index) => (
                    <li key={index} className="active:opacity-50">
                      <JssLink field={childItem.link?.link}>
                        <span className="text-sm">
                          {(childItem.link?.link?.value?.text || '').trim() === ''
                            ? childItem?.displayName
                            : childItem.link?.link?.value?.text}
                        </span>
                      </JssLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default FooterMenu;
