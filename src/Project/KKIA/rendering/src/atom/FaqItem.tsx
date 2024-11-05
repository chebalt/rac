import React, { useState, useRef, useEffect } from 'react';
import {
  Text as JssText,
  RichText as JssRichText,
  ComponentParams,
  TextField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';
import ChevronDownSvg from 'assets/icons/ChevronUpDown';

export interface FaqItemFields {
  Question: TextField;
  Answer: RichTextField;
}

export type FaqItemProps = {
  params: ComponentParams;
  fields: FaqItemFields;
};

const FaqItem = (props: FaqItemProps): JSX.Element => {
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
    <div className="faq-item mb-6 pb-8 pt-5 border-b border-muted-variant" onClick={toggleOpen}>
      <div
        className={`flex justify-between items-center cursor-pointer font-bold text-lg text-jade-darkest rtl:flex-row-reverse ${
          isOpen ? 'mb-[10px]' : ' mb-[8px]'
        }`}
      >
        <JssText field={props.fields.Question} />
        {isOpen ? <ChevronUpSvg /> : <ChevronDownSvg />}
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          maxHeight: hasMounted && isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
        }}
      >
        <div className="font-light text-lg text-muted-darker mt-2 transition-opacity duration-300">
          <JssRichText field={props.fields.Answer} />
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
