import { useCallback, useMemo } from "react";
import { Node, Edge } from "reactflow";

import { useGetDocState } from "@/redux/doc/hooks/useGetDocState";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { useAppDispatch } from "@/app/hooks";
import { docActions } from "@/redux/doc/slice/docSlice";

import dagre from "dagre";

const nodeWidth = 172;
const nodeHeight = 36;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[] } {
  const isHorizontal = direction === "LR";
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: x - nodeWidth / 2,
        y: y - nodeHeight / 2,
      },
    };
  });

  const layoutedEdges = edges.map((edge) => ({
    ...edge,
    sourceHandle: isHorizontal ? "right-source" : "bottom-source",
    targetHandle: isHorizontal ? "left-target" : "top-target",
  }));

  return { nodes: layoutedNodes, edges: layoutedEdges };
}

export const NodeAlignment = () => {
  const dispatch = useAppDispatch();
  const { pages, currentPageId } = useGetDocState();
  const currentPage = useCurrentPage(pages, currentPageId);

  const onLayout = useCallback(
    ({ direction }: { direction: "TB" | "LR" }) => {
      if (!currentPage?.nodes?.length || !currentPage?.edges?.length) return;

      const { nodes, edges } = currentPage;

      const selectedNodes = nodes.filter((node) => node.selected);
      if (!selectedNodes.length) return;

      const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));
      const selectedEdges = edges.filter(
        (edge) =>
          selectedNodeIds.has(edge.source) || selectedNodeIds.has(edge.target)
      );

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        [...selectedNodes],
        [...selectedEdges],
        direction
      );

      const layoutedNodeMap = new Map(layoutedNodes.map((n) => [n.id, n]));
      const layoutedEdgeMap = new Map(layoutedEdges.map((e) => [e.id, e]));

      dispatch(
        docActions.onSetNodes({
          nodes: nodes.map((node) => layoutedNodeMap.get(node.id) || node),
        })
      );

      dispatch(
        docActions.onChangeEdges(
          edges.map((edge) => layoutedEdgeMap.get(edge.id) || edge)
        )
      );
    },
    [currentPage, dispatch]
  );

  const onVertical = useCallback(() => {
    onLayout({ direction: "TB" });
  }, [onLayout]);

  const onHorizontal = useCallback(() => {
    onLayout({ direction: "LR" });
  }, [onLayout]);

  const nothingSelected = useMemo(() => {
    return !currentPage?.nodes?.some((n) => n.selected);
  }, [currentPage]);

  return (
    <>
      <button onClick={onVertical} disabled={nothingSelected}>
        Вертикальное
      </button>
      <button onClick={onHorizontal} disabled={nothingSelected}>
        Горизонтальное
      </button>
    </>
  );
};
