import { Page } from "@/redux/doc/interfaces/docStateInterfaces";

export const saveStateToClipboard = async (currentPage: Page) => {
  const selectedNodes = currentPage.nodes.filter((node) => node.selected);
  const selectedEdges = currentPage.edges.filter((edge) => edge.selected);

  const dataToCopy = {
    nodes: selectedNodes,
    edges: selectedEdges,
  };

  try {
    await navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
  } catch (error) {
    console.error('Ошибка при копировании:', error);
  }
}