import { useMemo } from 'react';
import { useCurrentPage } from './useCurrentPage';
import { useGetFlowState } from '@/redux/flow/hooks/useGetFlowState';

export const useCurrentNode = (nodeId: string) => {
  const { pages, currentPageId } = useGetFlowState();
  const currentPage = useCurrentPage(pages, currentPageId);
  const currentNode = useMemo(() => {
    if (currentPage.nodes?.length && nodeId) {
      return currentPage.nodes.find((node) => node.id === nodeId);
    }
    return null;
  }, [currentPage.nodes, nodeId]);

  return currentNode;
};
