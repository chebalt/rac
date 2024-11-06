import Button from 'components/atoms/Button';
import Accordion from 'components/atoms/Accordion';

import {
  Image as JssImage,
  LinkField,
  ImageField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface AccordionItem {
  fields: {
    title: TextField;
    description: TextField;
    icon?: TextField;
  };
}

interface RacAccordionProps {
  fields: {
    title: TextField;
    description: TextField;
    image: ImageField;
    content: TextField;
    content2: TextField;
    items: AccordionItem[];
    link: LinkField;
  };
}

export default function RacAccordion({ fields }: RacAccordionProps) {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-4 py-14 md:gap-24 md:px-24 md:py-24">
      <h2 className="text-headline-h1-2 text-text-primary">
        Riyadh Airports Company (RAC)
        <span className="font-normal">
          was established in 2016 as part of the privatization program of the aviation sector in
          Saudi Arabia.
        </span>
      </h2>
      <div className="flex flex-col-reverse gap-10 md:flex-row lg:gap-24">
        <JssImage
          field={fields.image}
          width={400}
          height={450}
          className="clip-hexagon max-h-[450px] w-[400px] flex-shrink-0"
        />
        <div className="flex flex-col gap-12">
          <p className="text-body-large-light text-text-secondary">
            RAC manages and operates King Khalid International Airport (KKIA) in the Saudi capital,
            Riyadh, looking after its existing facilities while also upgrading KKIA’s infrastructure
            and expansion with new services and facilities.
            <br />
            <br />
            RAC is committed to working closely with partners and stakeholders, both locally and
            globally, to ensure customer satisfaction with all services and products offered.
          </p>
          <div>
            <Accordion items={fields.items} />
          </div>
          <Button variant="primary" size="default" field={fields.link} />
        </div>
      </div>
    </div>
  );
}
