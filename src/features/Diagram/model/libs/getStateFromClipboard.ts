import { XYPosition } from "reactflow";
import { v1 } from "uuid";

export const getStateFromClipboard = async (
  screenToFlowPosition: (position: XYPosition) => XYPosition
) => {
  const clipboardText = await navigator.clipboard.readText();
  const parsedData = JSON.parse(clipboardText);

  if (parsedData.nodes && parsedData.edges) {
    const centerPosition = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const minX = Math.min(...parsedData.nodes.map((node: any) => node.position.x));
    const minY = Math.min(...parsedData.nodes.map((node: any) => node.position.y));

    const idMap = new Map<string, string>();

    const adjustedNodes = parsedData.nodes.map((node: any) => {
      const newId = v1();
      idMap.set(node.id, newId);
      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x - minX + centerPosition.x,
          y: node.position.y - minY + centerPosition.y,
        },
        data: {
          ...node.data,
          selected: true,
          id: newId,
        }
      };
    });

    const adjustedEdges = parsedData.edges.map((edge: any) => ({
      ...edge,
      id: v1(),
      source: idMap.get(edge.source) || edge.source,
      target: idMap.get(edge.target) || edge.target,
      selected: true,
    }));

    return {
      nodes: adjustedNodes,
      edges: adjustedEdges,
    }
  }
}