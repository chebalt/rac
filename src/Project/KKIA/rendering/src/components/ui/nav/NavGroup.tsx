import React from 'react';

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
          <a
            href={linkItem.link.link.value.href}
            className="c-nav-item__content--link text-jade-darkest"
          >
            {linkItem.link.link.value.text || linkItem.displayName}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavGroup;
