import { useCallback, useMemo } from "react";
import { Node, Edge } from "reactflow";

import { useGetDocState } from "@/redux/doc/hooks/useGetDocState";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { useAppDispatch } from "@/app/hooks";
import { docActions } from "@/redux/doc/slice/docSlice";

import styles from "../FloatingToolbar.module.scss";

import dagre from "dagre";

const nodeWidth = 172;
const nodeHeight = 36;

export function getLayoutedElements(
  nodes: Node[] = [],
  edges: Edge[] = [],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[] } {
  const isHorizontal = direction === "LR";
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  // 1. Используем реальные размеры
  nodes.forEach((node) => {
    const width = node.width ?? node.width ?? nodeWidth;
    const height = node.height ?? node.height ?? nodeHeight;

    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const layoutedNode = dagreGraph.node(node.id);
    const width = node.width ?? node.width ?? nodeWidth;
    const height = node.height ?? node.height ?? nodeHeight;

    return {
      ...node,
      position: {
        x: layoutedNode.x - width / 2,
        y: layoutedNode.y - height / 2,
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
          selectedNodeIds.has(edge.source) && selectedNodeIds.has(edge.target)
      );

      // 1. Определяем минимальные координаты среди выбранных нод
      const minXBefore = Math.min(...selectedNodes.map((n) => n.position.x));
      const minYBefore = Math.min(...selectedNodes.map((n) => n.position.y));

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        [...selectedNodes],
        [...selectedEdges],
        direction
      );

      // 2. Минимальные координаты после layout'а
      const minXAfter = Math.min(...layoutedNodes.map((n) => n.position.x));
      const minYAfter = Math.min(...layoutedNodes.map((n) => n.position.y));

      // 3. Смещение, которое нужно применить
      const offsetX = minXBefore - minXAfter;
      const offsetY = minYBefore - minYAfter;

      // 4. Обновляем позиции layouted нод с учётом смещения
      const shiftedLayoutedNodes = layoutedNodes.map((n) => ({
        ...n,
        position: {
          x: n.position.x + offsetX,
          y: n.position.y + offsetY,
        },
      }));

      const layoutedNodeMap = new Map(shiftedLayoutedNodes.map((n) => [n.id, n]));
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

      dispatch(docActions.onStateToHistory());
    },
    [currentPage, dispatch]
  );

  const onVertical = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onLayout({ direction: "TB" });
  }, [onLayout]);

  const onHorizontal = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onLayout({ direction: "LR" });
  }, [onLayout]);

  return (
    <>
      <button onClick={onVertical} className={styles.button}>
        ↕ Вертикально
      </button>
      <button onClick={onHorizontal} className={styles.button}>
        ↔ Горизонтально
      </button>
    </>
  );
};
