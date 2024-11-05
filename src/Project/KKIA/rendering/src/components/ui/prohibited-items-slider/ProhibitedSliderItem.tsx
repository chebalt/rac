import { Image as NextImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ProhibitedItem } from 'components/ProhibitedItemsSlider';

const ProhibitedSliderItem = ({ item }: { item: ProhibitedItem }): JSX.Element => {
  return (
    <div className="flex flex-col gap-6 px-4 items-center">
      <NextImage field={item.fields.Image} />
      <Text
        tag="p"
        className="w-full !text-center text-sm text-muted-darkest"
        field={item.fields.Text}
      />
    </div>
  );
};

export default ProhibitedSliderItem;
