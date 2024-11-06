'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ChevronRight from '../icons/ChevronRight';
import Home from '../icons/Home';
import Container from './Container';

const UPPERCASE_EXCEPTIONS = ['rac', 'kkia'];

interface BreadcrumbsProps {
  /** URL for testing purposes */
  url?: string;
}

/** Breadcrumbs component */
export default function Breadcrumbs({ url }: BreadcrumbsProps) {
  const pathname = usePathname() ?? url;

  if (!pathname) return null;

  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment
      .split('-')
      .map((word) => {
        if (UPPERCASE_EXCEPTIONS.includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    return { href, label };
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <Container>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 py-6">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-icon-action-secondary-default hover:text-icon-action-secondary-hover focus:outline-none focus:ring-2 focus:ring-border-action-focus active:text-icon-action-secondary-press"
            >
              <Home className="h-6 w-6" />
            </Link>
          </li>
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="mr-2 h-5 w-5 text-text-secondary" />
              <Link
                href={item.href}
                className={`${
                  index === breadcrumbs.length - 1
                    ? 'text-body-small-regular'
                    : 'text-body-small-light'
                } text-text-secondary hover:border-b hover:border-border-action-primary-hover focus:outline-none focus:ring-2 focus:ring-border-action-focus active:outline active:outline-1 active:outline-border-action-primary-press`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}
