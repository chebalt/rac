import React from 'react';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';

interface PaginationProps {
  /** The total number of pages. */
  totalPages: number;
  /** The current page number. */
  currentPage: number;
  /** The function to call when a page is clicked. */
  onPageChange: (page: number) => void;
  /** The function to call when the previous page is clicked. */
  onPrevious: () => void;
  /** The function to call when the next page is clicked. */
  onNext: () => void;
}

/** A pagination component. */
export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  onPrevious,
  onNext,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 2) {
      pageNumbers.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 1) {
      pageNumbers.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 2) {
      pageNumbers.push(1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Pagination" className="flex w-full items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={`text-body-medium-bold hover:text-text-action-secondary-hover active:text-text-action-secondary-press flex cursor-pointer items-center text-text-action-secondary-default hover:border-b-2 hover:border-border-action-secondary-hover focus:border-b-2 focus:border-border-action-secondary-default focus:outline-none focus:ring-2 focus:ring-border-action-focus active:border-b-2 active:border-border-action-secondary-press ${
          currentPage === 1 ? '!text-text-action-disabled' : ''
        }`}
      >
        <ArrowLeft className="mr-2 h-6 w-6" aria-hidden="true" />
        <span>Previous</span>
      </button>

      <ul className="flex items-center space-x-1" aria-label="Page navigation">
        {renderPageNumbers().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span
                className="text-body-medium-regular px-2 py-1 text-text-primary"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`px-2 py-1 ${
                  currentPage === page
                    ? 'text-body-medium-bold hover:text-text-action-secondary-hover active:text-text-action-secondary-press border-b-2 border-border-action-secondary-default bg-background text-text-action-secondary-default hover:border-border-action-secondary-hover hover:bg-surface-action-secondary-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-border-action-focus active:border-border-action-secondary-press active:bg-surface-action-secondary-press'
                    : 'text-body-medium-regular bg-background text-text-primary hover:bg-surface-action-tertiary-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-border-action-focus active:bg-surface-action-tertiary-press'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={`text-body-medium-bold hover:text-text-action-secondary-hover active:text-text-action-secondary-press flex cursor-pointer items-center text-text-action-secondary-default hover:border-b-2 hover:border-border-action-secondary-hover focus:border-b-2 focus:border-border-action-secondary-default focus:outline-none focus:ring-2 focus:ring-border-action-focus active:border-b-2 active:border-border-action-secondary-press ${
          currentPage === totalPages ? '!text-text-action-disabled' : ''
        }`}
      >
        <span>Next</span>
        <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
      </button>
    </nav>
  );
}
