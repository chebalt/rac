import {
  Text as JssText,
  Link as JssLink,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useInView } from 'react-intersection-observer';
import ArrowButton from 'components/atoms/ArrowButton';

interface AboutSection {
  fields: {
    title: TextField;
    description: TextField;
    link: LinkField;
  };
}

function AboutItemDesktop({ field }: { field: AboutSection }) {
  return (
    <div className={`group flex w-1/4 flex-col justify-end border-r border-[#FFFFFF66]`}>
      <div className="flex flex-col gap-4 px-10 py-14">
        <JssLink
          className="translate-y-2 transform opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
          field={field.fields.link}
        >
          <ArrowButton direction="down-right" size="large" />
        </JssLink>
        <JssText
          className="text-headline-h2 text-text-invert"
          field={field.fields.title}
          tag="h2"
        />
        <JssText
          className="text-body-medium-light max-w-[241px] text-text-invert"
          field={field.fields.description}
          tag="p"
        />
      </div>
      <div className="h-5 w-full bg-surface-action-primary-default opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
    </div>
  );
}

function AboutItemMobile({ field }: { field: AboutSection }) {
  const { ref, inView } = useInView({
    rootMargin: '0px 0px -30% 0px',
    triggerOnce: true,
  });

  return (
    <div className="flex flex-col gap-4 px-4 pb-6">
      <div className="flex w-full justify-between">
        <JssText
          className="text-headline-h2 text-text-invert"
          field={field.fields.title}
          tag="h2"
        />
        <JssLink
          ref={ref}
          field={field.fields.link}
          className={`${
            inView ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500 ease-in-out`}
        >
          <ArrowButton direction="down-right" size="small" />
        </JssLink>
      </div>
      <JssText
        className="text-body-medium-light text-text-invert"
        field={field.fields.description}
        tag="p"
      />
    </div>
  );
}

export { AboutItemDesktop, AboutItemMobile };
