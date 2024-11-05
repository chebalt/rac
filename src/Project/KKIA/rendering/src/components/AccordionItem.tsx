import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Image as JssImage,
  Text as JssText,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ChevronDownSvg from 'assets/icons/ChevronUpDown';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';

export interface AccordionItemFields {
  Title: TextField;
  Icon: ImageField;
}
export type AccordionItemProps = {
  fields: AccordionItemFields;
  rendering: ComponentRendering;
  params: ComponentParams;
};

const AccordionItem = (props: AccordionItemProps): JSX.Element => {
  const phKey = `kkia-pagecontent-accordionitem-${props.params.DynamicPlaceholderId}`;
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className={`flex gap-4 w-full ${isOpen ? 'max-md:flex-col' : ''}`}>
        <div className={`flex flex-col w-full ${isOpen ? ' gap-4 ' : 'gap-0'}`}>
          <div
            className="flex justify-between items-center py-[0.625rem] hover:cursor-pointer rtl:flex-row-reverse"
            onClick={toggleOpen}
          >
            <div className="flex items-center gap-4">
              <JssImage field={props.fields.Icon} className="w-12 h-12" />
              <JssText
                field={props.fields.Title}
                tag="p"
                className="text-body-medium-bold text-text-primary"
              />
            </div>
            {isOpen ? <ChevronUpSvg className="w-6 h-6" /> : <ChevronDownSvg className="w-6 h-6" />}
          </div>
          <div
            ref={contentRef}
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out xl:pl-16 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              maxHeight: hasMounted && isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
            }}
          >
            <Placeholder name={phKey} rendering={props.rendering} />
          </div>
        </div>
      </div>
      <div className="border-b border-border-secondary my-8"></div>
    </div>
  );
};

export default AccordionItem;
