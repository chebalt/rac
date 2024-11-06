// 'use client';
// import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
// import Button from 'components/atoms/Button';
// import Plane from 'components/icons/Plane';
// import { useCallback } from 'react';

// interface FooterFields {
//   fields: {
//     copyright: TextField;
//     backToTop: TextField;
//   };
// }

// interface FooterBottomProps {
//   props: FooterFields;
// }

// export default function FooterBottom({ props }: FooterBottomProps) {
//   const scrollToTop = useCallback(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   }, []);

//   return (
//     <>
//       {/* Destkop view */}
//       <div className="hidden w-full bg-ocean-700 md:block md:py-8">
//         <div className="mx-auto flex w-full max-w-[1248px] items-center justify-between">
//           <JssText
//             tag="p"
//             className="text-body-extra-small-bold text-text-invert"
//             field={props.fields.copyright}
//           />
//           <Button
//             variant="inverted"
//             label={props.fields.backToTop.value}
//             leftIcon={<Plane />}
//             onClick={scrollToTop}
//             className="py-0"
//           />
//         </div>
//       </div>
//       {/* Mobile view */}
//       <div className="relative block w-full bg-ocean-700 pb-6 pt-8 md:hidden">
//         <button
//           type="button"
//           className="absolute -top-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-aqua-700 p-2 text-text-invert"
//           onClick={scrollToTop}
//         >
//           <Plane className="h-4 w-4" />
//         </button>
//         <JssText
//           tag="p"
//           className="text-body-extra-small-bold text-center text-text-invert"
//           field={props.fields.copyright}
//         />
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useI18n } from 'next-localization';
import Plane from 'components/icons/Plane';

export default function FooterBottom(): JSX.Element {
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
        <Plane />
      </div>
      <span className="text-center flex justify-center md:text-[#FFFFFF50]">
        {t('bottom-copy-rights')}
      </span>
      <div onClick={scrollToTop} className="hidden md:flex cursor-pointer hover:md:opacity-90">
        <div className="text-lightGreen text-lg px-2">
          <Plane />
        </div>
        <span className="uppercase min-w-24">{t('back-to-the-top')}</span>
      </div>
    </div>
  );
}
