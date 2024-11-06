'use client';
import LogoInvert from 'components/icons/LogoInvert';
import { useState } from 'react';
import Facebook from 'components/icons/social-icons/Facebook';
import Instagram from 'components/icons/social-icons/Instagram';
import Linkedin from 'components/icons/social-icons/Linkedin';
import X from 'components/icons/social-icons/X';
import Youtube from 'components/icons/social-icons/Youtube';
import Link from 'next/link';
import Button from 'components/atoms/Button';
import Image from 'next/image';
import Plus from 'components/icons/Plus';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  Link as JssLink,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface LinksWithCategories {
  value: string;
  links: LinkField[];
}

interface FooterFields {
  fields: {
    ctaHeader: TextField;
    ctaLink: LinkField;
    ctaImage: ImageField;
    linksWithCategories: LinksWithCategories[];
  };
}

interface FooterTopProps {
  props: FooterFields;
}

export default function FooterTop({ props }: FooterTopProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <>
      {/* Desktop View */}
      <div
        className={clsx(
          'hidden flex-col bg-ocean-600 px-4 md:flex',
          pathname === '/' ? 'mt-[206px]' : ''
        )}
      >
        {pathname === '/' && (
          <div className="relative mx-auto h-[404px] w-full max-w-[1248px] translate-y-[-150px]">
            <JssImage
              field={props.fields.ctaImage}
              width={1248}
              height={404}
              className="clip-hexagon-2 absolute left-0 top-0 h-full w-full object-cover"
            />
            <div className="clip-hexagon-2 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blue-overlay">
              <div className="flex max-w-[50%] flex-col items-center gap-10">
                <JssText
                  tag="p"
                  className="text-body-extra-large-bold text-center text-text-invert"
                  field={props.fields.ctaHeader}
                />

                <Button variant="secondary" field={props.fields.ctaLink} />
              </div>
            </div>
          </div>
        )}
        <div
          className={clsx(
            'mx-auto flex w-full max-w-[1248px] justify-between pb-24',
            pathname === '/' ? '' : 'pt-24'
          )}
        >
          <div className="flex flex-col gap-14">
            <LogoInvert />
            <div className="flex gap-24">
              {props.fields.linksWithCategories.map((item, index) => (
                <div key={index} className="flex flex-col gap-5">
                  <h4 className="body-text-extra-small-bold uppercase text-text-invert">
                    {item.value}
                  </h4>
                  {/* FIX ME
                  <div className="flex flex-col gap-4">
                    {item.links.map((link, index) => (
                      <JssLink
                        key={index}
                        field={link}
                        className="text-body-text-small-regular text-text-invert"
                      />
                    ))}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="body-text-extra-small-bold uppercase text-text-invert">Follow us</p>
            <div className="flex gap-6">
              <Link href="/">
                <Linkedin className="h-6 w-6 text-text-invert" />
              </Link>
              <Link href="/">
                <Instagram className="h-6 w-6 text-text-invert" />
              </Link>
              <Link href="/">
                <X className="h-6 w-[26px] text-text-invert" />
              </Link>
              <Link href="/">
                <Facebook className="h-6 w-6 text-text-invert" />
              </Link>
              <Link href="/">
                <Youtube className="h-6 w-6 text-text-invert" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex w-full flex-col justify-between bg-ocean-600 md:hidden">
        {pathname === '/' && (
          <div className="relative mx-auto h-[332px] w-full bg-footer-top-bg">
            <Image
              src="/10.png"
              alt="footer-top-bg"
              width={1248}
              height={404}
              className="clip-hexagon-2 absolute left-0 top-0 h-full w-full object-cover"
            />
            <div className="clip-hexagon-2 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blue-overlay">
              <div className="flex flex-col items-center gap-10">
                <JssText
                  tag="p"
                  className="text-headline-h2 max-w-[25ch] text-center text-text-invert"
                  field={props.fields.ctaHeader}
                />
                <Button field={props.fields.ctaLink} variant="secondary" className="!w-fit" />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-10 px-4 py-14">
          <LogoInvert />
          <div>
            <div className="flex flex-col gap-5">
              <p className="body-text-extra-small-bold uppercase text-text-invert">Follow us</p>
              <div className="flex gap-6">
                <Link href="/">
                  <Linkedin className="h-6 w-6 text-text-invert" />
                </Link>
                <Link href="/">
                  <Instagram className="h-6 w-6 text-text-invert" />
                </Link>
                <Link href="/">
                  <X className="h-6 w-[26px] text-text-invert" />
                </Link>
                <Link href="/">
                  <Facebook className="h-6 w-6 text-text-invert" />
                </Link>
                <Link href="/">
                  <Youtube className="h-6 w-6 text-text-invert" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#DCDCDC33] text-text-invert">
            {props.fields.linksWithCategories.map((category, index) => (
              <div key={index} className="border-b border-[#DCDCDC33]">
                <div
                  className="flex cursor-pointer items-center justify-between py-4"
                  onClick={() => toggleCategory(category.value)}
                >
                  <p className="body-text-extra-small-bold uppercase">{category.value}</p>
                  <Plus
                    className={`h-6 w-6 transition-transform ${
                      openCategory === category.value ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {/*  FIX ME
                {openCategory === category.value && (
                  <div className="flex flex-col gap-4 pb-4">
                    {category.links.map((link, linkIndex) => (
                      <JssLink
                        key={linkIndex}
                        field={link}
                        className="text-body-text-small-regular pl-4 text-text-invert"
                      />
                    ))}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
