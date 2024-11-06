// import Logo from 'components/icons/Logo';
// import Navigation from 'components/molecules/Navigation';

// import Container from 'components/atoms/Container';

// import Hamburger from 'components/icons/Hamburger';

// import Search from 'components/icons/Search';
// import Close from 'components/icons/Close';
// import { Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

// interface HeaderBottomFields {
//   logo: LinkField;
//   links: LinkField[];
// }

// interface HeaderBottomProps {
//   setIsOpen: (isOpen: boolean) => void;
//   toggleSearchDrawer?: () => void;
//   isSearchOpen?: boolean;
//   props: HeaderBottomFields;
// }

// export default function HeaderBottom({
//   setIsOpen,
//   toggleSearchDrawer,
//   isSearchOpen,
//   props,
// }: HeaderBottomProps) {
//   return (
//     <div>
//       <Container className="flex h-20 items-center justify-between">
//         <JssLink field={props.logo}>
//           <Logo className="h-[48px] w-[141px]" />
//         </JssLink>
//         <div className="hidden md:block">
//           <Navigation
//             toggleSearchDrawer={toggleSearchDrawer}
//             isSearchOpen={isSearchOpen}
//             links={props.links}
//           />
//         </div>
//         <div className="flex items-center gap-3 md:hidden">
//           <button className="p-2" onClick={toggleSearchDrawer}>
//             {isSearchOpen ? <Close className="h-6 w-6" /> : <Search className="h-6 w-6" />}
//           </button>
//           <div className="h-8 w-px bg-[#55575926]"></div>

//           <button onClick={() => setIsOpen(true)} aria-label="Toggle menu">
//             <Hamburger className="h-8 w-8" />
//           </button>
//         </div>
//       </Container>
//     </div>
//   );
// }
import React from 'react';

export default function HeaderBottom() {
  return <div>HeaderBottom</div>;
}
