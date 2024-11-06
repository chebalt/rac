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
  title: TextField;
  description: TextField;
}

interface WorkWithUsAccordionFields {
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

interface WorkWithUsAccordionProps {
  props: WorkWithUsAccordionFields;
}

export default function WorkWithUsAccordion({ props }: WorkWithUsAccordionProps) {
  return (
    <div className="bg-surface-secondary px-4 py-14 md:py-24">
      <div className="flex flex-col gap-8 md:mx-auto md:max-w-[1248px] md:flex-row md:items-center md:gap-14 md:bg-surface-primary md:pr-2">
        <div className="flex flex-col gap-8 md:gap-0">
          <div className="relative max-h-[270px] overflow-hidden">
            <Logo className="absolute left-[15px] top-[8.5px] z-10" />
            <JssImage
              field={props.fields.image}
              width={649}
              height={270}
              className="clip-trapezoid-2"
            />
          </div>
          <div className="flex flex-col gap-4 md:p-14">
            <JssText
              tag="h2"
              className="text-headline-h2 text-text-primary"
              field={props.fields.title}
            />
            <JssText
              tag="p"
              className="text-body-medium-light text-text-secondary"
              field={props.fields.description}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <JssText tag="p" className="text-body-normal-light" field={props.fields.label} />
            <JssText
              tag="h2"
              className="text-headline-h2 text-text-primary"
              field={props.fields.subTitle}
            />
          </div>
          <Accordion items={props.fields.items} />
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
