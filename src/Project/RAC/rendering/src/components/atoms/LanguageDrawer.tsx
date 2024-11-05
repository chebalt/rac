import { useState } from 'react';
import ArrowTip from '../icons/ArrowTip';
import clsx from 'clsx';
import LanguageEnglish from '../icons/LanguageEnglish';
import LanguageArabic from '../icons/LanguageArabic';

export interface LanguageDrawerProps {
  /** The open state of the language drawer */
  isOpen: boolean;
  /** The toggle drawer handler */
  toggleDrawer: () => void;
  /** The list of languages to display */
  languages: Array<{
    code: string;
    name: string;
  }>;
}

/**
 * A component that displays a language drawer
 */
export default function LanguageDrawer({ isOpen, toggleDrawer, languages }: LanguageDrawerProps) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]?.code || '');

  const languageItem = (language: { code: string; name: string }, index: number) => {
    const isCurrentLanguage = language.code === currentLanguage;
    return (
      <div
        key={index}
        className={clsx(
          'flex cursor-pointer items-center gap-2 px-5 py-4 focus:shadow-outline focus:outline-none',
          isCurrentLanguage
            ? 'bg-surface-action-secondary-default hover:bg-surface-action-secondary-hover active:bg-surface-action-secondary-press'
            : 'bg-surface-primary hover:bg-surface-action-tertiary-hover active:bg-surface-action-tertiary-press'
        )}
        onClick={() => setCurrentLanguage(language.code)}
      >
        {language.code === 'en' ? <LanguageEnglish /> : <LanguageArabic />}
        <span
          className={clsx(
            isCurrentLanguage
              ? 'text-body-extra-small-bold text-text-action-primary-default'
              : 'text-body-extra-small-regular text-text-primary'
          )}
        >
          {language.name}
        </span>
      </div>
    );
  };

  return (
    <div
      className="text-body-extra-small-regular hover:text-text-action-secondary-hover active:text-text-action-secondary-press relative flex cursor-pointer items-center gap-1 px-4 py-2 uppercase text-text-action-secondary-default"
      onClick={toggleDrawer}
    >
      {currentLanguage}
      <ArrowTip
        className={clsx('h-4 w-4 transition-transform', {
          'rotate-180': isOpen,
        })}
      />
      <div
        className={clsx(
          'absolute right-0 top-full z-30 flex h-auto w-fit flex-col justify-between bg-surface-primary shadow-pressed',
          { hidden: !isOpen }
        )}
      >
        <div className="flex flex-col">
          {languages.map((language, index) => languageItem(language, index))}
        </div>
      </div>
    </div>
  );
}
