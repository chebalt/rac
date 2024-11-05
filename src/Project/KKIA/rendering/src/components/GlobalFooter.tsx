import {
  Placeholder,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import FooterItemWrapper from 'src/shared-components/FooterItemWrapper';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
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
      <SectionPaddingWrapper className="bg-primary-dark-green py-6 lg:py-20">
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
      </SectionPaddingWrapper>
      <SectionPaddingWrapper className="bg-darkGreen">
        <Placeholder name={phKeyFooterBottom} rendering={props.rendering} />
      </SectionPaddingWrapper>
    </>
  );
};

export default GlobalFooter;
