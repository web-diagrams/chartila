import { useCallback } from "react";
import { Node, Edge } from "reactflow";

import { useGetDocState } from "@/redux/doc/hooks/useGetDocState";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { useAppDispatch } from "@/app/hooks";
import { docActions } from "@/redux/doc/slice/docSlice";
import { cloneDeep } from "lodash";
 
import dagre from 'dagre'

const nodeWidth = 172
const nodeHeight = 36

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB' // Top-Bottom или Left-Right
): { nodes: Node[]; edges: Edge[] } {
  const isHorizontal = direction === 'LR'
  const dagreGraph = new dagre.graphlib.Graph()

  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction }) // TB = вертикально, LR = горизонтально

  // добавляем узлы
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  // добавляем связи
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })

  const layoutedEdges = edges.map((edge) => ({
    ...edge,
    sourceHandle: isHorizontal ? 'right-source' : 'bottom-source',
    targetHandle: isHorizontal ? 'left-target' : 'top-target',
  }))

  return { nodes: layoutedNodes, edges: layoutedEdges }
}

export const NodeAlignment = () => {
    const dispatch = useAppDispatch();
    const { pages, currentPageId } = useGetDocState();
    const currentPage = useCurrentPage(pages, currentPageId);
    
    const onLayout = useCallback(
        ({ direction }: {direction: "TB" | "LR"}) => {
            if (!currentPage?.nodes || !currentPage?.edges) {
              return;
            }

            const { nodes, edges } = currentPage;

            const selectedNodes = nodes.filter((node) => node.selected);
            const selectedEdges = edges.filter((edge) => {
              const intersectedNode = selectedNodes.find((node) => node.id === edge.source || node.id === edge.target);
              return !!intersectedNode;
            });

            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
              cloneDeep(selectedNodes),
              cloneDeep(selectedEdges), 
              direction
            );

            dispatch(docActions.onSetNodes({ nodes: nodes.map((node) => {
              const updatedNode = layoutedNodes.find((lNode) => lNode.id === node.id) 
              if (updatedNode) {
                return updatedNode;
              } else {
                return node;
              }
            }) }));
            dispatch(docActions.onChangeEdges((edges.map((edge) => {
              const updatedEdge = layoutedEdges.find((lEdge) => lEdge.id === edge.id) 
              if (updatedEdge) {
                return updatedEdge;
              } else {
                return edge;
              }
            }))));
        },
        [currentPage],
      );

    const onVertical = () => {
      onLayout({direction: 'TB'})
    }

    const onHorizontal = () => {
      onLayout({direction: 'LR'})
    }

    return (
      <>
        <button onClick={onVertical}>Вертикальное</button>
        <button onClick={onHorizontal}>Горизонтальное</button>
      </>
    )
}