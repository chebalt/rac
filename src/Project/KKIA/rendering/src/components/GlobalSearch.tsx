import PreviewSearchList from './sitecore-search/PreviewSearchList';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface GlobalSearchProps {
  isSearchOpen: boolean;
}

export default function GlobalSearch({ isSearchOpen }: GlobalSearchProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchRef.current) {
      if (isSearchOpen) {
        searchRef.current.style.opacity = '0';
        searchRef.current.style.transform = 'translateY(-20px)';
        searchRef.current.style.display = 'flex';
        setTimeout(() => {
          if (searchRef.current) {
            searchRef.current.style.opacity = '1';
            searchRef.current.style.transform = 'translateY(0)';
          }
        }, 50);
      } else {
        searchRef.current.style.opacity = '0';
        searchRef.current.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          if (searchRef.current) {
            searchRef.current.style.display = 'none';
          }
        }, 300);
      }
    }
  }, [isSearchOpen]);

  return (
    <div
      ref={searchRef}
      className="absolute top-[66px] md:top-full left-0 h-[152px] justify-center items-start bg-surface-primary shadow-lg z-[60] py-10 w-full"
      style={{
        display: 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div className="w-full p-4 md:p-0 md:px-4 max-w-[1320px] mx-auto relative">
        <PreviewSearchList
          rfkId="rfkid_6"
          defaultItemsPerPage={6}
          submitRedirectionHandler={(query: string) => {
            router.push(`/search?q=${query}`);
          }}
          itemRedirectionHandler={(article) => {
            router.push(article.url);
          }}
        />
      </div>
    </div>
  );
}
