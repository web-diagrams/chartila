import { useMemo } from 'react';
import { useCurrentPage } from './useCurrentPage';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { Page } from '@/redux/doc/interfaces/docStateInterfaces';

/**
 * Hook to get a specific node from the current page
 * @param nodeId - The ID of the node to retrieve
 * @returns The node object or undefined if not found
 */
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

/**
 * Helper function to find a node by ID in the current page
 * @param currentPage - The page to search in
 * @param nodeId - The ID of the node to find
 * @returns The node object or null if not found
 */
const getCurrentNode = (currentPage: Page, nodeId: string) => {
  if (currentPage.nodes?.length && nodeId) {
    return currentPage.nodes.find((node) => node.id === nodeId);
  }
  return null;
};
