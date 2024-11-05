import { ReactNode } from 'react';

export default function FooterItemWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full lg:w-1/3 py-4 lg:min-h-32">{children}</div>;
}
