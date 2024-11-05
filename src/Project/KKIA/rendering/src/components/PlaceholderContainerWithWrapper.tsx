import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

const Default = (props: ComponentProps): JSX.Element => {
  return (
    <SectionPaddingWrapper>
      <div className="flex flex-wrap justify-between py-10 md:py-14">
        <Placeholder name="kkia-contactinformation-placeholder" rendering={props.rendering} />
        <Placeholder name="kkia-contactform-placeholder" rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};

const WithForm = (props: ComponentProps): JSX.Element => {
  return (
    <SectionPaddingWrapper>
      <div className="flex flex-wrap justify-between py-10 md:py-14">
        <Placeholder name="kkia-contactinformation-placeholder" rendering={props.rendering} />
        <Placeholder name="kkia-contactform-placeholder" rendering={props.rendering} />
      </div>
    </SectionPaddingWrapper>
  );
};
export { Default, WithForm };
