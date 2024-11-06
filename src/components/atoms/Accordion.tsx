'use client';
import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import ChevronDown from '../icons/ChevronDown';

import { getIcon } from 'lib/getIcon';

interface AccordionProps {
  items: {
    fields: {
      title: TextField;
      description: TextField;
      icon?: TextField;
    };
  }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setOpenIndexes((prevState) =>
      prevState.includes(index) ? prevState.filter((i) => i !== index) : [...prevState, index]
    );
  };

  return (
    <div className="flex flex-col">
      {items?.map((item, index) => (
        <div className="flex gap-6" key={index}>
          <div className="flex w-12 flex-col items-center">
            <div className="p-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-border-action-primary-default">
                <div className="h-3 w-3 rounded-full bg-surface-primary"></div>
              </div>
            </div>
            <div className="h-full w-1 rounded-full bg-surface-quaternary"></div>
          </div>
          <div className="flex w-full flex-col gap-8">
            <div
              className="flex w-full cursor-pointer items-center gap-4"
              onClick={() => handleClick(index)}
            >
              {item.fields.icon?.value && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary">
                  <div className="h-6 w-6 text-icon-primary">
                    {getIcon(item.fields.icon.value?.toString() || '')}
                  </div>
                </div>
              )}
              <div className="flex w-full items-center justify-between">
                <JssText
                  tag="h4"
                  className="text-body-medium-bold text-text-primary"
                  field={item.fields.title}
                />
                <div
                  className={`h-6 w-6 text-icon-primary transition-transform duration-300 ${
                    openIndexes.includes(index) ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown />
                </div>
              </div>
            </div>
            <div className="mb-8 overflow-hidden border-t border-border-action-tertiary-default">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndexes.includes(index) ? 'max-h-screen py-2' : 'max-h-0'
                }`}
              >
                <JssText tag="p" field={item.fields.description} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
