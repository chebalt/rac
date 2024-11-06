import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';

interface CardFields {
  image: ImageField;
  title: TextField;
  description: TextField;
}

interface HoverCardProps {
  /** The fields for the hover card, including an image, title and description */
  fields: CardFields;
  /** The width of the hover card */
  width?: string;
  /** The height of the hover card */
  height?: string;
}

/**
 * A component that displays a hover card with an image, title and description
 */
export default function HoverCard({ fields, width, height }: HoverCardProps) {
  return (
    <div className={clsx('group relative overflow-hidden', width, height)}>
      <JssImage
        field={fields.image}
        width={288}
        height={227}
        className="absolute z-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-0 z-10 flex w-full translate-y-[calc(100%-4rem)] flex-col justify-end bg-surface-primary p-6 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <JssText
          tag="h3"
          className="text-body-large-bold mb-6 text-text-primary group-hover:mb-3"
          field={fields.title}
        />
        <JssText
          tag="p"
          className="text-body-normal-light text-text-secondary"
          field={fields.description}
        />
      </div>
    </div>
  );
}
