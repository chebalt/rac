import { ReactNode } from 'react';

interface TabContentProps {
  children: ReactNode;
}

export default function TabContent({ children }: TabContentProps) {
  return <div>{children}</div>;
}
