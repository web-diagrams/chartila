import { useMemo } from 'react';
import { useCurrentPage } from './useCurrentPage';
import { useGetFlowState } from '@/redux/flow/hooks/useGetFlowState';
import { Page } from '@/redux/flow/interfaces/flowStateInterfaces';

export const useCurrentNode = (nodeId: string) => {
  const { pages, currentPageId } = useGetFlowState();
  const currentPage = useCurrentPage(pages, currentPageId);
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
