import { Image as JssImage, Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import { format } from 'date-fns';
import { DateField as JssDateField } from '@sitecore-jss/sitecore-jss-react';
import { useI18n } from 'next-localization';
import useUrl from 'src/hooks/useUrl';
import Button from 'src/shared-components/Button';
import { NewsCardsItemProps } from 'components/NewsCards';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';

const NewsCardsItem = (props: NewsCardsItemProps): JSX.Element => {
  const { Image, 'Publication Date': PublicationDate, Description } = props.fields;
  const { t } = useI18n();
  const { itemUrl, url } = props;
  const fullUrl = useUrl(itemUrl || url);

  return (
    <div className="flex flex-col w-full bg-surface-secondary md:min-h-[488px] mb-4">
      <div className="flex flex-col flex-1">
        <div className="h-[200px] relative">
          <JssImage field={Image} className="absolute w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col p-6 rtl:items-end">
          <div className="flex-1 rtl:text-right">
            <JssDateField
              field={PublicationDate}
              render={(date) => (date ? format(new Date(date), 'dd MMM yyyy').toUpperCase() : '')}
            />
            <h5 className="font-bold my-4">
              <JssText field={Description} />
            </h5>
          </div>
          <Button
            url={fullUrl}
            label={t('newscards-readMore')}
            variant="tertiary"
            rightIcon={<ArrowRightSvg />}
            size="default"
            className="pl-0"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsCardsItem;
