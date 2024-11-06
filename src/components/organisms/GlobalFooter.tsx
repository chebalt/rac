// import { TextField, LinkField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
// import FooterBottom from 'components/molecules/FooterBottom';
// import FooterTop from 'components/molecules/FooterTop';

// interface LinksWithCategories {
//   value: string;
//   links: LinkField[];
// }

// interface FooterFields {
//   fields: {
//     ctaHeader: TextField;
//     ctaLink: LinkField;
//     ctaImage: ImageField;
//     linksWithCategories: LinksWithCategories[];
//     subTitle: TextField;
//     copyright: TextField;
//     backToTop: TextField;
//   };
// }

// interface GlobalFooterProps {
//   props: FooterFields;
// }

// export default function GlobalFooter({ props }: GlobalFooterProps) {
//   return (
//     <div className="w-full">
//       <FooterTop props={props} />
//       <FooterBottom props={props} />
//     </div>
//   );
// }

import {
  Placeholder,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import FooterItemWrapper from 'components/atoms/FooterItemWrapper';
import Container from 'components/atoms/Container';
interface GlobalFooterProps {
  rendering: ComponentRendering;
  params: ComponentParams;
}

const GlobalFooter = (props: GlobalFooterProps): JSX.Element => {
  const phKeyFooterBottom = `kkia-pagecontent-footerbottom-${props.params.DynamicPlaceholderId}`;
  const phKeyFooterApps = `kkia-pagecontent-footerapps-${props.params.DynamicPlaceholderId}`;
  const phKeyFooterGlobalLink = `kkia-pagecontent-footergloballink-${props.params.DynamicPlaceholderId}`;
  const phKeyFooterLogo = `kkia-pagecontent-footerlogo-${props.params.DynamicPlaceholderId}`;
  const phKeyFooterLogoWithText = `kkia-pagecontent-footerlogowithtext-${props.params.DynamicPlaceholderId}`;
  const phKeyFooterMenu = `kkia-pagecontent-footermenu-${props.params.DynamicPlaceholderId}`;
  const phKeyFooterSocial = `kkia-pagecontent-footersocial-${props.params.DynamicPlaceholderId}`;

  return (
    <>
      <Container className="bg-primary-dark-green py-6 lg:py-20">
        <div className="flex flex-wrap dir-rtl">
          <FooterItemWrapper>
            <Placeholder name={phKeyFooterLogo} rendering={props.rendering} />
          </FooterItemWrapper>
          <FooterItemWrapper>
            <Placeholder name={phKeyFooterSocial} rendering={props.rendering} />
          </FooterItemWrapper>
          <FooterItemWrapper>
            <Placeholder name={phKeyFooterGlobalLink} rendering={props.rendering} />
          </FooterItemWrapper>
          <FooterItemWrapper>
            <Placeholder name={phKeyFooterMenu} rendering={props.rendering} />
          </FooterItemWrapper>
          <FooterItemWrapper>
            <Placeholder name={phKeyFooterLogoWithText} rendering={props.rendering} />
          </FooterItemWrapper>
          <FooterItemWrapper>
            <Placeholder name={phKeyFooterApps} rendering={props.rendering} />
          </FooterItemWrapper>
        </div>
      </Container>
      <Container className="bg-darkGreen">
        <Placeholder name={phKeyFooterBottom} rendering={props.rendering} />
      </Container>
    </>
  );
};

export default GlobalFooter;
