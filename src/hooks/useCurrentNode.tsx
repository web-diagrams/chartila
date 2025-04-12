import { useMemo } from 'react';
import { useCurrentPage } from './useCurrentPage';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { Page } from '@/redux/doc/interfaces/docStateInterfaces';

export const useCurrentNode = (nodeId: string) => {
  const { pages, currentPageId } = useGetDocState();
  const currentPage = useCurrentPage(pages, currentPageId);
  if (!currentPage) {
    return
  }
  const currentNode = useMemo(() => {
    return getCurrentNode(currentPage, nodeId);
  }, [currentPage, nodeId]);

  return currentNode;
};

const getCurrentNode = (currentPage: Page, nodeId: string) => {
  if (currentPage.nodes?.length && nodeId) {
    return currentPage.nodes.find((node) => node.id === nodeId);
  }
  return null;
};
