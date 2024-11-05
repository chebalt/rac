import { Link, Text, LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowIconSvg from 'assets/icons/ArrowIconSvg';
import clsx from 'clsx';

export default function SecondaryButton({
  field,
  className,
  isLink = true,
  text,
  hasIcon,
}: {
  field?: LinkField | TextField;
  className?: string;
  isLink?: boolean;
  text?: string;
  hasIcon?: boolean;
}) {
  const isLinkField = (field: LinkField | TextField): field is LinkField => {
    return (field as LinkField)?.value?.href !== undefined;
  };

  return (
    <>
      {isLink && field && isLinkField(field) ? (
        <Link
          className={clsx(
            'w-full max-w-[350px] bg-lightGreen text-black py-4 px-10 active:opacity-50 flex justify-center font-bold rtl:flex-row-reverse',
            className
          )}
          field={field}
        >
          {field.value.text}
          {hasIcon && (
            <div className="ml-2">
              <ArrowIconSvg />
            </div>
          )}
        </Link>
      ) : (
        <p
          className={clsx(
            'w-fit bg-lightGreen text-black py-4 px-10 active:opacity-50 cursor-pointer flex justify-center font-bold',
            className
          )}
        >
          {field ? <Text field={field as TextField} /> : text}
        </p>
      )}
    </>
  );
}
