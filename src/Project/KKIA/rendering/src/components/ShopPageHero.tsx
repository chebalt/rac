import React from 'react';
import {
  Text,
  Image as JssImage,
  ComponentRendering,
  ImageField,
  withDatasourceCheck,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';

type ShopPageProps = {
  fields: {
    Image: ImageField;
    Category: {
      fields: {
        Name: TextField;
      };
    } | null;
    Name: TextField;
  };
};

interface ShopPageHeroProps {
  rendering: ComponentRendering;
  fields: {
    Shop: ShopPageProps | null;
  };
}

const ShopPageHero = (props: ShopPageHeroProps): JSX.Element => {
  const { Shop } = props.fields;

  if (!Shop) {
    return (
      <p className="uppercase px-3 py-1 text-primary-dark-green bg-jade-light">No Shop Selected</p>
    );
  }

  const { Image, Category, Name } = Shop.fields;

  return (
    <div className="shop-page-hero w-full max-h-[372px] relative">
      <JssImage field={Image} className="h-[372px] object-cover w-full" />

      <SectionPaddingWrapper>
        <div className="absolute bottom-[3.5rem] flex flex-col gap-[3.5rem] z-10">
          <div className="uppercase px-3 py-1 text-primary-dark-green bg-jade-light w-fit text-[1.125rem]">
            {Category ? <Text field={Category.fields.Name} /> : <p>No Category Selected</p>}
          </div>
          <div className="text-[4rem] max-xl:text-[3rem] font-bold text-white">
            <Text field={Name} />
          </div>
        </div>
      </SectionPaddingWrapper>

      <div className="shop-hero__preview-overlay"></div>
    </div>
  );
};

export default withDatasourceCheck()<ShopPageHeroProps>(ShopPageHero);
