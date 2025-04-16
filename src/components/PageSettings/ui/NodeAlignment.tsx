import { useCallback } from "react";
import { useReactFlow, Node, Edge } from "reactflow";

import ELK, { LayoutOptions } from 'elkjs/lib/elk.bundled.js';
import { useGetDocState } from "@/redux/doc/hooks/useGetDocState";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { useAppDispatch } from "@/app/hooks";
import { docActions } from "@/redux/doc/slice/docSlice";
import { cloneDeep } from "lodash";
 
const elk = new ELK();
 
// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};
 


const getLayoutedElements = (nodes: Node[], edges: Edge[], options: LayoutOptions = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
 
      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };
 
  return elk
  .layout(graph)
  .then((layoutedGraph) => ({
    nodes: layoutedGraph.children.map((node) => ({
      ...node,
      position: { x: node.x, y: node.y },
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
    })),
    edges: layoutedGraph.edges,
  }))
  .catch(console.error);
};

export const NodeAlignment = () => {
    const dispatch = useAppDispatch();
    const { pages, currentPageId } = useGetDocState();
    const currentPage = useCurrentPage(pages, currentPageId);
    const { fitView } = useReactFlow();
    
    const onLayout = useCallback(
        ({ direction }: {direction: string}) => {
            if (!currentPage?.nodes || !currentPage?.edges) {
                return;
            }

            const opts = { 'elk.direction': direction, ...elkOptions };
            const { nodes, edges } = currentPage;

            getLayoutedElements(cloneDeep(nodes), cloneDeep(edges), opts).then((data) => {
                if (!data) {
                  return;
                } 
                const { 
                  nodes: layoutedNodes, 
                  edges: layoutedEdges 
                } = data;
                dispatch(docActions.onSetNodes({ nodes: layoutedNodes as Node[] }));
                if (layoutedEdges) {
                  const convertedEdges: Edge[] = layoutedEdges.map((elkEdge) => ({
                    source: elkEdge.sources?.[0] ?? '',
                    target: elkEdge.targets?.[0] ?? '',
                    ...elkEdge,
                    // добавь type, label, style и другие поля, если нужно
                  }));
                  dispatch(docActions.onChangeEdges((convertedEdges)));
                }
                fitView();
            });
        },
        [currentPage],
      );

    const onVertical = () => {
      onLayout({direction: 'DOWN'})
    }

    const onHorizontal = () => {
      onLayout({direction: 'RIGHT'})
    }

    return (
      <>
        <button onClick={onVertical}>Вертикальное</button>
        <button onClick={onHorizontal}>Горизонтальное</button>
      </>
    )
}