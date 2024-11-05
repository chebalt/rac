import React from 'react';
import {
  LinkField,
  ImageField,
  Field,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Card from 'components/ui/three-links-highlight/Card';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

interface ThreeLinksHighlightProps {
  rendering: ComponentRendering;
  fields: {
    FirstCardTitle: Field<string>;
    FirstCardDescription: Field<string>;
    FirstCardLink: LinkField;
    FirstCardIcon: ImageField;
    SecondCardTitle: Field<string>;
    SecondCardDescription: Field<string>;
    SecondCardLink: LinkField;
    SecondCardIcon: ImageField;
    ThirdCardTitle: Field<string>;
    ThirdCardDescription: Field<string>;
    ThirdCardLink: LinkField;
    ThirdCardIcon: ImageField;
  };
}

const ThreeLinksHighlight = (props: ThreeLinksHighlightProps): JSX.Element => {
  return (
    <SectionPaddingWrapper>
      <div className="c-three-links">
        <Card
          title={props.fields.FirstCardTitle}
          description={props.fields.FirstCardDescription}
          link={props.fields.FirstCardLink}
          icon={props.fields.FirstCardIcon}
        />
        <Card
          title={props.fields.SecondCardTitle}
          description={props.fields.SecondCardDescription}
          link={props.fields.SecondCardLink}
          icon={props.fields.SecondCardIcon}
        />
        <Card
          title={props.fields.ThirdCardTitle}
          description={props.fields.ThirdCardDescription}
          link={props.fields.ThirdCardLink}
          icon={props.fields.ThirdCardIcon}
        />
      </div>
    </SectionPaddingWrapper>
  );
};

export default ThreeLinksHighlight;
