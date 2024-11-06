import { TextField, LinkField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import FooterBottom from 'components/molecules/FooterBottom';
import FooterTop from 'components/molecules/FooterTop';

interface LinksWithCategories {
  value: string;
  links: LinkField[];
}

interface FooterFields {
  fields: {
    ctaHeader: TextField;
    ctaLink: LinkField;
    ctaImage: ImageField;
    linksWithCategories: LinksWithCategories[];
    subTitle: TextField;
    copyright: TextField;
    backToTop: TextField;
  };
}

interface GlobalFooterProps {
  props: FooterFields;
}

export default function GlobalFooter({ props }: GlobalFooterProps) {
  return (
    <div className="w-full">
      <FooterTop props={props} />
      <FooterBottom props={props} />
    </div>
  );
}
