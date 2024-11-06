// 'use client';
// import LanguageDrawer from 'components/atoms/LanguageDrawer';
// import WeatherDrawer from 'components/atoms/WeatherDrawer';
// import { useState } from 'react';
// import Container from '../atoms/Container';
// import { Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

// interface Language {
//   value: {
//     code: string;
//     name: string;
//   };
// }

// interface Weather {
//   value: {
//     city: string;
//     temperature: string;
//   };
// }

// interface HeaderTopProps {
//   props: {
//     fields: {
//       languages: Language[];
//       weather: Weather;
//       kkiaLink: LinkField;
//     };
//   };
// }

// export default function HeaderTop({ props }: HeaderTopProps) {
//   const [openDrawer, setOpenDrawer] = useState<string | null>(null);

//   const toggleDrawer = (drawer: string) => {
//     setOpenDrawer(openDrawer === drawer ? null : drawer);
//   };

//   return (
//     <div className="h-8 w-full bg-surface-secondary">
//       <Container className="flex h-8 w-full items-center justify-end">
//         <WeatherDrawer
//           isOpen={openDrawer === 'weather'}
//           toggleDrawer={() => toggleDrawer('weather')}
//         />

//         <JssLink
//           field={props.fields.kkiaLink}
//           className="text-body-extra-small-regular hover:text-text-action-secondary-hover active:text-text-action-secondary-press border-l border-r border-border-action-tertiary-default px-4 py-2 text-text-action-secondary-default"
//         /> */}

//         <LanguageDrawer
//           isOpen={openDrawer === 'language'}
//           toggleDrawer={() => toggleDrawer('language')}
//           languages={props.fields.languages.map((language) => ({
//             code: language.value.code,
//             name: language.value.name,
//           }))}
//         />
//       </Container>
//     </div>
//   );
// }
import React from 'react';

export default function HeaderTop() {
  return <div>HeaderTop</div>;
}
