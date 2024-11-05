import { Text as JssText, TextField } from '@sitecore-jss/sitecore-jss-react';

import BackgroundPattern from 'components/icons/geometricImages/BackgroundPattern';
import HexagonPatern from 'components/icons/geometricImages/hexagonPatern';

interface ManageAndOperateProps {
  fields: {
    title: TextField;
  };
}

export default function ManageAndOperate({ fields }: ManageAndOperateProps) {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden h-[304px] w-full bg-surface-action-primary-default md:block">
        <div className="relative mx-auto flex h-[304px] w-full max-w-[1440px] items-center justify-center">
          <BackgroundPattern className="absolute right-0 top-0" />
          {fields?.title && (
            <JssText
              tag="h2"
              className="text-headline-h1-2 max-w-[622px] text-text-invert"
              field={fields.title}
            />
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex h-[835px] flex-col items-end md:hidden">
        <div className="flex h-[739px] w-full flex-col bg-surface-action-primary-default">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center">
            <div className="mt-16 flex-shrink-0">
              <HexagonPatern />
            </div>
            <div className="relative h-[146px] w-full flex-shrink-0 bg-surface-primary">
              <div className="clip-trapezoid absolute left-0 top-0 h-full w-full translate-y-[-1px] bg-surface-action-primary-default"></div>
              <div className="clip-triangle-reverse absolute left-0 top-0 h-full w-full translate-y-[1px] bg-surface-action-primary-default"></div>
            </div>
            <div className="max-w-[270px] pt-14">
              {fields?.title && (
                <JssText
                  tag="h2"
                  className="text-headline-h1 text-text-invert"
                  field={fields.title}
                />
              )}
            </div>
          </div>
        </div>
        <div className="clip-triangle h-[96px] w-[161px] translate-y-[-1px] bg-surface-action-primary-default"></div>
      </div>
    </>
  );
}
