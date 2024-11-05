import { Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
import { BrandsSliderItemProps } from 'components/BrandsSlider';

const BrandsSliderItem = ({ item }: { item: BrandsSliderItemProps }): JSX.Element => {
  return (
    <div
      className={clsx(
        'm-auto md:m-0',
        'border-[#00000008] border-2',
        'flex items-center justify-center',
        'p-16 max-xl:p-[1.875rem]'
      )}
    >
      <JssImage field={item.fields.Logo} className="object-contain w-full h-[212px] md:w-[280px]" />
    </div>
  );
};

export default BrandsSliderItem;
