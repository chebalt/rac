import { TextField, LinkField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { AboutItemDesktop, AboutItemMobile } from '../molecules/AboutItems';

interface AboutSection {
  fields: {
    title: TextField;
    description: TextField;
    link: LinkField;
  };
}

interface AboutProps {
  fields?: {
    image?: ImageField;
    items?: AboutSection[];
  };
}

export default function About({ fields }: AboutProps) {
  if (!fields?.items) return null;
  return (
    <div className="h-[1014px] w-full bg-surface-quaternary md:h-[773px]" id="about">
      <div
        className="mx-auto h-full w-full bg-cover bg-center bg-no-repeat md:max-w-[1440px]"
        style={{ backgroundImage: `url(${fields?.image?.value?.src || ''})` }}
      >
        {/* Desktop view */}
        <div className="hidden h-full w-full bg-[#1D1D1D40] md:flex">
          {Array.isArray(fields?.items) &&
            fields.items.map((item, index) => <AboutItemDesktop key={index} field={item} />)}
        </div>
        {/* Mobile view */}
        <div className="flex h-full w-full flex-col justify-center bg-[#1D1D1D40] md:hidden">
          {Array.isArray(fields?.items) &&
            fields.items.map((item, index) => <AboutItemMobile key={index} field={item} />)}
        </div>
      </div>
    </div>
  );
}
