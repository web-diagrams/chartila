import { Page } from '@/redux/doc/interfaces/docStateInterfaces';
import { useMemo } from 'react';

/**
 * Hook to get the currently active page from the pages array
 * @param pages - Array of all pages
 * @param currentPageId - ID of the currently selected page
 * @returns The current page object or null if not found
 */
export const useCurrentPage = (pages: Page[], currentPageId: string) => {
  const currentPage = useMemo(() => {
    if (pages?.length && currentPageId) {
      return pages.find((page) => page.id === currentPageId);
    }
    return null;
  }, [pages, currentPageId]);

  return currentPage;
};
