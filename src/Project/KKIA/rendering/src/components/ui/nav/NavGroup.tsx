import React from 'react';
import CustomLink from 'src/shared-components/CustomLink';

type NavGroupProps = {
  links: {
    displayName: string;
    link: {
      link: {
        value: {
          href: string;
          text: string;
          id: string;
        };
      };
    };
  }[];
};

const NavGroup: React.FC<NavGroupProps> = ({ links }) => {
  return (
    <ul className="c-nav-item">
      {links.map((linkItem) => (
        <li key={linkItem.link.link.value.id} className="c-nav-item__content max-lg:rtl:text-end">
          <CustomLink
            url={linkItem.link.link.value.href}
            title={linkItem.link.link.value.text || linkItem.displayName}
            className="c-nav-item__content--link text-jade-darkest"
          />
        </li>
      ))}
    </ul>
  );
};

export default NavGroup;
