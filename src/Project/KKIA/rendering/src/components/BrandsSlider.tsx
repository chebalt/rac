import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  Text,
  Link,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BrandSliderCarousel from './ui/brands-slider/BrandsSliderCarousel';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';
import ArrowGroup from 'src/shared-components/ArrowGroup';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';

interface BrandsSliderFields {
  Title: TextField;
  Link: LinkField;
  Header: TextField;
  Brands: Array<BrandsSliderItemProps>;
}

export interface BrandsSliderItemFields {
  Logo: ImageField;
}

export type BrandsSliderItemProps = {
  id: string;
  params: ComponentParams;
  fields: BrandsSliderItemFields;
};

type BrandsSliderProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: BrandsSliderFields;
};

export const Default = (props: BrandsSliderProps): JSX.Element => {
  return (
    <>
      <SectionPaddingWrapper className="pb-10 pt-14">
        <div className="w-full flex justify-between items-center rtl:flex-row-reverse">
          <div className="flex flex-col gap-4">
            <p className="text-label-bold text-text-secondary">
              <Text field={props.fields.Header} />
            </p>
            <h2 className="text-headline-h2 text-text-primary">
              <Text field={props.fields.Title} />
            </h2>
          </div>
          <div className="select-none text-lightGreen3 max-md:hidden">
            <ArrowGroup
              nextBtnClassName="brandSlider-button-next"
              prevBtnClassName="brandSlider-button-prev"
            />
          </div>
        </div>
      </SectionPaddingWrapper>
      <div className="m-auto w-auto xl:ml-custom rtl:xl:ml-0 rtl:xl:mr-[max(0px,(90%-1320px)/2)] overflow-x-hidden dir-rtl">
        <div className="select-none xl:w-[100vw] w-full">
          <BrandSliderCarousel cards={[...props.fields.Brands, ...props.fields.Brands]} />
        </div>
      </div>
      <SectionPaddingWrapper className="pt-10 pb-10 md:pb-14">
        {props.fields.Link.value.href && (
          <div className="flex items-center gap-2 relative max-w-fit rtl:max-w-none rtl:justify-end">
            <Link
              field={props.fields.Link}
              className="pr-8 relative z-10 text-body-normal-bold text-text-action-secondary-default hover:text-text-action-secondary-hover active:text-text-action-secondary-active"
            />
            <ArrowRightSvg className="absolute right-0 z-0 text-icon-action-secondary-default hover:text-icon-action-secondary-hover active:text-icon-action-secondary-active" />
          </div>
        )}
      </SectionPaddingWrapper>
    </>
  );
};
