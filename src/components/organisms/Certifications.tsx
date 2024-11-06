import ArrowRight from 'components/icons/ArrowRight';
import Button from 'components/atoms/Button';
import CertificationCard from 'components/atoms/CertifiedCard';
import {
  Text as JssText,
  LinkField,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface TrustedProps {
  fields: {
    title: TextField;
    link: LinkField;
    certifications: {
      fields: {
        Image: ImageField;
      };
    }[];
  };
}

export default function Certifications({ fields }: TrustedProps) {
  return (
    <div className="hidden flex-col gap-10 py-14 md:flex">
      <div className="mx-auto w-full max-w-[1248px]">
        <div className="flex w-full justify-between">
          <JssText tag="h2" className="text-headline-h2 text-text-primary" field={fields.title} />
          <Button variant="tertiary" rightIcon={<ArrowRight />} field={fields.link} />
        </div>
        <div className="flex flex-row gap-6">
          {fields.certifications.map((certification, index) => (
            <CertificationCard key={index} field={certification} />
          ))}
        </div>
      </div>
    </div>
  );
}
