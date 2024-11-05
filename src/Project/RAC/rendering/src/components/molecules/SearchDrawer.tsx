import { useEffect, useRef } from 'react';
import SearchInput from 'components/atoms/SearchInput';

interface SearchDrawerProps {
  isOpen: boolean;
}

export default function SearchDrawer({ isOpen }: SearchDrawerProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={searchRef}
      className="absolute left-0 z-[60] h-[152px] w-full items-start justify-center bg-surface-primary py-10 shadow-lg md:top-full"
      style={{
        display: 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div className="relative mx-auto w-full max-w-[1320px] p-4 md:p-0 md:px-4">
        <SearchInput
          id="search"
          value=""
          onChange={() => {
            console.log('search');
          }}
          placeholder="Search"
        />
      </div>
    </div>
  );
}
