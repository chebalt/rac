import Button from 'components/atoms/Button';
import Accordion from 'components/atoms/Accordion';
import Logo from 'components/icons/Logo';
import {
  Image as JssImage,
  Text as JssText,
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface AccordionItem {
  fields: {
    title: TextField;
    description: TextField;
    icon?: TextField;
  };
}

interface WorkWithUsAccordionProps {
  fields: {
    title: TextField;
    description: TextField;
    label: TextField;
    subTitle: TextField;
    image: ImageField;
    items: AccordionItem[];
    link: LinkField;
  };
}

export default function WorkWithUsAccordion({ fields }: WorkWithUsAccordionProps) {
  return (
    <div className="bg-surface-secondary px-4 py-14 md:py-24">
      <div className="flex flex-col gap-8 md:mx-auto md:max-w-[1248px] md:flex-row md:items-center md:gap-14 md:bg-surface-primary md:pr-2">
        <div className="flex flex-col gap-8 md:gap-0">
          <div className="relative max-h-[270px] overflow-hidden">
            <Logo className="absolute left-[15px] top-[8.5px] z-10" />
            <JssImage field={fields.image} width={649} height={270} className="clip-trapezoid-2" />
          </div>
          <div className="flex flex-col gap-4 md:p-14">
            <JssText tag="h2" className="text-headline-h2 text-text-primary" field={fields.title} />
            <JssText
              tag="p"
              className="text-body-medium-light text-text-secondary"
              field={fields.description}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <JssText tag="p" className="text-body-normal-light" field={fields.label} />
            <JssText
              tag="h2"
              className="text-headline-h2 text-text-primary"
              field={fields.subTitle}
            />
          </div>
          <Accordion items={fields.items} />
          <Button
            variant="primary"
            label="Check job offers"
            size="default"
            url="/careers/job-positions"
          />
        </div>
      </div>
    </div>
  );
}
