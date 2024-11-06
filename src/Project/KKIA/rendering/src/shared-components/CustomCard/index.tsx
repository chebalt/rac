import React from 'react';
import {
  Text,
  Image,
  ImageField,
  TextField,
  LinkField,
  useSitecoreContext,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import TerminalBox from './TerminalBox';
import ClockSvg from 'assets/icons/ClockSvg';
import PhoneSvg from 'assets/icons/PhoneSvg';
import GlobeSvg from 'assets/icons/GlobeSvg';
import PinSvg from 'assets/icons/PinSvg';
import IconWrapper from './IconWrapper';
import { useI18n } from 'next-localization';
import clsx from 'clsx';
import Arrow2IconSvg from 'assets/icons/Arrow2IconSvg';
import Book from 'assets/icons/Book';
import { Text20 } from '../Texts';
import CategoryTagLayer from '../CategoryTagLayer';
import Button from 'src/shared-components/Button';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';
import CustomLink from '../CustomLink';

interface ICustomCard {
  image: ImageField;
  title: TextField;
  category?: TextField;
  description?: TextField;
  openTime?: TextField;
  phoneNumber?: TextField;
  website?: LinkField;
  menulink?: LinkField;
  terminals?: Array<{
    id: string;
    fields: {
      Location: LinkField;
    };
  }>;
  btnText: string;
  btnUrl: string;
  fileHref?: string;
  routesGuides?: { fields: { Text: TextField }; id: string }[];
  location?: LinkField;
  infoList?: { fields: { Text: TextField; Icon: ImageField }; id: string }[];
  loading?: boolean;
}

export default function CustomCard({
  title,
  category,
  description,
  image,
  openTime,
  phoneNumber,
  website,
  menulink,
  terminals,
  btnText,
  btnUrl,
  fileHref,
  routesGuides,
  location,
  infoList,
  loading,
}: ICustomCard) {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext.pageEditing;

  const formatPhoneNumber = (phoneNumber: string) => {
    console.log(`link: ${btnUrl}`);
    return phoneNumber.replace(/[^0-9+]/g, '');
  };

  const categoryBoxClassName =
    'text-primary-dark-green px-4 py-2 uppercase text-body-medium-regular bg-lightGray';

  return (
    <div className="w-full bg-lightGray2 flex flex-col">
      {loading ? (
        <div className="h-48 bg-gray-200 animate-pulse" />
      ) : (
        <>
          <div className="relative min-h-32">
            <NextImage
              field={image}
              alt={`${title.value} thumbnail image`}
              className="w-full h-48 object-cover"
            />
            {(category || isEditing) && <CategoryTagLayer name={category?.value as string} />}
            {routesGuides && routesGuides.length > 0 && (
              <>
                {routesGuides.map((el) => (
                  <div key={el.id} className={clsx(categoryBoxClassName, 'mb-2')}>
                    <Text field={el.fields.Text} />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="p-6 flex-1 flex flex-col rtl:items-end">
            <div className="flex-1">
              <Text20 field={title} className="font-bold mb-2" />
              {(menulink?.value.href || isEditing) && (
                <div className="flex items-center mb-5 hover:opacity-90">
                  <IconWrapper>
                    <Book className="w-6 h-6" />
                  </IconWrapper>
                  <h6 className="font-light text-muted-darker">
                    <CustomLink field={menulink ?? { value: { href: '', text: '' } }} />
                  </h6>
                </div>
              )}
              {(location || isEditing) && (
                <div className="flex text-primary-dark-green items-center hover:opacity-70 rtl:justify-end">
                  <div className="font-bold text-sm">
                    <CustomLink field={location ?? { value: { href: '', text: '' } }} />
                  </div>
                  <div className="ml-2">
                    <Arrow2IconSvg />
                  </div>
                </div>
              )}
              {(description || isEditing) && (
                <p className="mb-5 text-base font-light text-muted-darker">
                  <Text field={description ?? { value: '' }} />
                </p>
              )}
              {infoList && (
                <div className="my-5">
                  {infoList.map((info) => (
                    <div key={info.id} className="flex items-center mb-3 rtl:flex-row-reverse">
                      <IconWrapper>
                        <Image field={info.fields.Icon} className="w-6 h-6" />
                      </IconWrapper>
                      <span className="text-base text-muted-dark font-light">
                        <Text field={info.fields.Text} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {(openTime || isEditing) && (
                <div className="flex items-center mb-3 rtl:flex-row-reverse">
                  <IconWrapper>
                    <ClockSvg />
                  </IconWrapper>
                  <h6 className="font-light text-muted-darker">
                    <Text field={openTime ?? { value: '' }} />
                  </h6>
                </div>
              )}
              {fileHref && (
                <div className="mb-3 hover:opacity-90">
                  <a
                    href={String(fileHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex"
                  >
                    <GlobeSvg />
                    <span>{t('shopdetailscard-checkMenu')}</span>
                  </a>
                </div>
              )}
              {(phoneNumber || isEditing) && (
                <div className="mb-3 hover:opacity-90">
                  <a
                    href={`tel:${formatPhoneNumber(String(phoneNumber?.value || ''))}`}
                    className="flex"
                  >
                    <IconWrapper>
                      <PhoneSvg />
                    </IconWrapper>
                    <h6 className="font-light text-muted-darker">
                      <Text field={phoneNumber ?? { value: '' }} />
                    </h6>
                  </a>
                </div>
              )}
              {(website || isEditing) && (
                <div className="flex items-center mb-5 hover:opacity-90 rtl:flex-row-reverse">
                  <IconWrapper>
                    <GlobeSvg />
                  </IconWrapper>
                  <h6 className="font-light text-muted-darker">
                    <CustomLink field={website ?? { value: { href: '', text: '' } }} />
                  </h6>
                </div>
              )}
              {
                <div className="flex items-center mb-3 rtl:flex-row-reverse">
                  <IconWrapper>
                    <PinSvg className="w-6 h-6" />
                  </IconWrapper>
                  <h6>{t('threecolumnshops-location')}</h6>
                </div>
              }
              {terminals && terminals.length > 0 && (
                <div className="flex mb-5 flex-wrap gap-3 rtl:flex-row-reverse">
                  {terminals.map((terminal) => (
                    <TerminalBox key={terminal.id} field={terminal.fields.Location} />
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="tertiary"
              label={btnText}
              url={btnUrl}
              className="max-w-[150px]"
              rightIcon={<ArrowIconSvg />}
            />
          </div>
        </>
      )}
    </div>
  );
}
