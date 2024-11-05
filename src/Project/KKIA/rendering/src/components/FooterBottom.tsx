import React, { useEffect, useState } from 'react';
import { useI18n } from 'next-localization';
import PlaneIconSvg from 'assets/icons/PlaneIconSvg';

const FooterBottom = (): JSX.Element => {
  const { t } = useI18n();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToTop = () => {
    if (isClient) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full text-white flex flex-col md:flex-row justify-between items-center md:items-start py-6 dir-rtl">
      <div
        onClick={scrollToTop}
        className="md:hidden absolute -top-5 text-white text-3xl p-2 bg-darkGreen rounded-full active:opacity-50"
      >
        <PlaneIconSvg />
      </div>
      <span className="text-center flex justify-center md:text-[#FFFFFF50]">
        {t('bottom-copy-rights')}
      </span>
      <div onClick={scrollToTop} className="hidden md:flex cursor-pointer hover:md:opacity-90">
        <div className="text-lightGreen text-lg px-2">
          <PlaneIconSvg />
        </div>
        <span className="uppercase min-w-24">{t('back-to-the-top')}</span>
      </div>
    </div>
  );
};

export default FooterBottom;
