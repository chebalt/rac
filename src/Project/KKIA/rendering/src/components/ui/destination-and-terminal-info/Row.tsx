import { LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Link } from '@sitecore-jss/sitecore-jss-react';
import PinSvg from 'assets/icons/PinSvg';
import clsx from 'clsx';
import { Text16 } from 'src/shared-components/Texts';

export default function Row({
  isHeader,
  destination,
  terminalName,
  location,
}: {
  isHeader?: boolean;
  destination: string | TextField;
  terminalName: string | TextField;
  location: string | LinkField;
}) {
  return (
    <div
      className={clsx(
        'w-full text-muted-darker flex max-w-[820px] border-b border-l border-r border-jade-dark',
        {
          'h-12': !isHeader,
          'h-16 bg-jade-light font-bold border-t': isHeader,
        }
      )}
    >
      <div className="w-full flex items-center px-6">
        {typeof destination === 'string' ? (
          <Text16>{destination}</Text16>
        ) : (
          <Text16 field={destination} />
        )}
      </div>
      <div className="w-full md:w-[113px] flex justify-center items-center">
        {typeof terminalName === 'string' ? (
          <Text16>{terminalName}</Text16>
        ) : (
          <Text16 field={terminalName} />
        )}
      </div>
      <div className="w-full md:w-[113px] flex justify-center items-center hover:opacity-80">
        {typeof location === 'string' ? (
          <Text16>{location}</Text16>
        ) : (
          <Link field={location}>
            <PinSvg />
          </Link>
        )}
      </div>
    </div>
  );
}
