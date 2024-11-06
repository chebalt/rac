import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { usePathname } from 'next/navigation';

import MenuItem from 'components/atoms/MenuItem';

import Search from 'components/icons/Search';
import Close from 'components/icons/Close';

interface NavigationProps {
  toggleSearchDrawer?: () => void;
  isSearchOpen?: boolean;
  links: LinkField[];
}

export default function Navigation({ toggleSearchDrawer, isSearchOpen, links }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 lg:gap-8">
      {links.map((page) => (
        <MenuItem key={page.value.href} field={page} isActive={pathname === page.value.href} />
      ))}
      <button className="p-2" onClick={toggleSearchDrawer}>
        {isSearchOpen ? <Close className="h-6 w-6" /> : <Search className="h-6 w-6" />}
      </button>
    </div>
  );
}
