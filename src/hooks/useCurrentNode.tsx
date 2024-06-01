import { useAppSelector } from '@/app/hooks';
import { useMemo } from 'react';
import { useCurrentPage } from './useCurrentPage';

export const useCurrentNode = (nodeId: string) => {
  const { pages, currentPageId } = useAppSelector((state) => state.flow);
  const currentPage = useCurrentPage(pages, currentPageId);
  const currentNode = useMemo(() => {
    if (currentPage.nodes?.length && nodeId) {
      return currentPage.nodes.find((node) => node.id === nodeId);
    }
    return null;
  }, [currentPage.nodes, nodeId]);

  return currentNode;
};
