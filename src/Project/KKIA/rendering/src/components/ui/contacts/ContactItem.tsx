import CustomLink from 'src/shared-components/CustomLink';

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps): JSX.Element {
  return (
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-jade-light flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-4 min-w-0">
        <span className="text-lg font-normal text-muted-darker">{label}</span>
        {href ? (
          <CustomLink
            url={href}
            title={value}
            className="text-lg font-bold text-jade-darkest break-words"
          />
        ) : (
          <span className="text-lg font-bold text-jade-darkest break-words">{value}</span>
        )}
      </div>
    </div>
  );
}

export default ContactItem;
