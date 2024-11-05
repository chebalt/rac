import React from 'react';
import {
  Text,
  Field,
  Link as JssLink,
  ComponentRendering,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import CallSvg from 'assets/icons/CallSvg';
import PinSvg from 'assets/icons/PinSvg';

interface NeedSupportBannerProps {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    FirstLink: LinkField;
    SecondLink: LinkField;
  };
}

const NeedSupportBanner = (props: NeedSupportBannerProps): JSX.Element => {
  return (
    <SectionPaddingWrapper className="my-10 md:my-14">
      <div className={`component`}>
        <div className="component-content flex flex-col gap-6 bg-background-gray-variant px-4 py-14 text-center">
          <h3 className="font-bold text-[2rem] text-jade-darkest rtl:!text-center">
            <Text field={props.fields.Title} />
          </h3>
          <p className="font-light text-lg text-muted-dark rtl:!text-center">
            <Text field={props.fields.Description} />
          </p>
          <div className="flex flex-col md:flex-row gap-8 md:justify-center md:items-center">
            <div className="flex gap-2 justify-center items-center">
              <CallSvg />
              <JssLink
                field={props.fields.FirstLink}
                className="font-bold text-base text-muted-dark"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-primary-dark-green text-base">
                <PinSvg />
              </div>
              <JssLink
                field={props.fields.SecondLink}
                className="font-bold text-base text-muted-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};

export default NeedSupportBanner;
