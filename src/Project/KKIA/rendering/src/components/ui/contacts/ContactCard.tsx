import { Field, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ArrowRightSvg from 'assets/icons/ArrowRightSvg';
import CustomLink from 'src/shared-components/CustomLink';

interface ContactCardProps {
  title: Field<string>;
  description: Field<string>;
  link: LinkField;
}

function ContactCard({ title, description, link }: ContactCardProps): JSX.Element {
  console.log('Link', link);
  return (
    <div className="bg-background-dark p-6">
      <Text field={title} tag="h3" className="text-xl font-bold text-muted-darkest mb-5" />
      <Text field={description} tag="p" className="text-muted-dark font-light mb-5" />
      <div className="flex items-center gap-2">
        <CustomLink
          field={link}
          className="text-primary-dark-green-variant font-bold text-normal flex items-center gap-2"
        />
        <ArrowRightSvg className="text-primary-dark-green" />
      </div>
    </div>
  );
}

export default ContactCard;
