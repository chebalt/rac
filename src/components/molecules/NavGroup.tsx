import { Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';

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
          <JssLink
            field={linkItem.link.link}
            className="c-nav-item__content--link text-jade-darkest"
          />
        </li>
      ))}
    </ul>
  );
};

export default NavGroup;
