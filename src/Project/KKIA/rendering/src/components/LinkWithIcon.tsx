import { Field, ComponentRendering, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared-components/CustomLink';

interface LinkWithIconProps {
  rendering: ComponentRendering;
  fields: {
    Link: LinkField;
    Icon: Field<string>;
  };
}

const LinkWithIcon = ({ fields }: LinkWithIconProps): JSX.Element => {
  return (
    <div className="text-white hover:md:opacity-90">
      <div className="flex items-center">
        <div dangerouslySetInnerHTML={{ __html: fields?.Icon.value }} />
        <CustomLink field={fields.Link} className="ml-2 rtl:ml-0 rtl:mr-2" />
      </div>
    </div>
  );
};

export default LinkWithIcon;
