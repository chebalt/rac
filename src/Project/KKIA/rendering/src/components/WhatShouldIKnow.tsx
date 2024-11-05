import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  TextField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Default as WhatShouldIKnowItem,
  WhatShouldIKnowItemFields,
} from 'src/components/ui/what-should-i-know/WhatShouldIKnowItem';
import { Text32, Text12 } from 'src/shared-components/Texts';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

interface WhatShouldIKnowFields {
  Tag: TextField;
  Title: TextField;
  Items: Array<WhatShouldIKnowItemProps>;
}

interface WhatShouldIKnowItemProps {
  fields: WhatShouldIKnowItemFields;
}

type WhatShouldIKnowProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: WhatShouldIKnowFields;
};

export const Default = (props: WhatShouldIKnowProps): JSX.Element => {
  const items = props.fields?.Items || [];

  return (
    <SectionPaddingWrapper className="py-10 md:py-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <JssText
            field={props.fields.Tag}
            tag="p"
            className="text-label-bold text-text-secondary"
          />
          <JssText
            field={props.fields.Title}
            tag="h2"
            className="text-headline-h2 text-text-primary"
          />
        </div>
        <div className="flex justify-between flex-col md:flex-row">
          {items.map((item, index) => (
            <WhatShouldIKnowItem key={index} params={props.params} fields={item.fields} />
          ))}
        </div>
      </div>
    </SectionPaddingWrapper>
  );
};
