import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Arrow2IconSvg from 'assets/icons/Arrow2IconSvg';

export default function TerminalBox({ field }: { field: LinkField }) {
  return (
    <Link
      field={field}
      className="border border-primary-dark-green px-2 py-1 flex items-center hover:opacity-50 rtl:flex-row-reverse"
    >
      <span className="mr-2 text-sm">{field.value.text}</span>
      <div className="text-primary-dark-green text-base">
        <Arrow2IconSvg />
      </div>
    </Link>
  );
}
