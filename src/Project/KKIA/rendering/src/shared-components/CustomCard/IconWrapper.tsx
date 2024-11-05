import { ReactNode } from 'react';

export default function IconWrapper({ children }: { children: ReactNode }) {
  return <div className="text-primary-dark-green text-base mr-2 rtl:ml-2 rtl:mr-0">{children}</div>;
}
