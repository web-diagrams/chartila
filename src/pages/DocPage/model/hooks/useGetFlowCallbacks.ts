import { useAppDispatch } from '@/app/hooks';
import { FlowState, Page } from '@/redux/flow/interfaces/flowStateInterfaces';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useCallback, useRef } from 'react';
import { applyEdgeChanges, Connection, Edge, EdgeChange, NodeChange, updateEdge } from 'reactflow';
import { type Node } from 'reactflow';

export const useGetFlowCallbacks = (history: FlowState[], step: number, currentPage: Page) => {
  const dispatch = useAppDispatch();
  const edgeUpdateSuccessful = useRef(true);

  const onNodeChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(flowActions.onChangeNodes({ changes }));
    },
    [dispatch],
  );

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    if (history[step] && !history[step].pages) {
      const prevNode = history[step].pages
        .find((page) => page.id === currentPage.id).nodes
        .find((nodeItem) => nodeItem.id === node.id)
      if (prevNode.position.x !== node.position.x || prevNode.position.y !== node.position.y) {
        dispatch(flowActions.onStateToHistory());
      }
    };

  }, [currentPage?.id, dispatch, history, step]);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      dispatch(flowActions.onChangeEdges(updateEdge(oldEdge, newConnection, currentPage?.edges)));
    },
    [currentPage?.edges, dispatch],
  );

  const onEdgeUpdateEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current && currentPage?.edges) {
        dispatch(flowActions.onChangeEdges(currentPage.edges.filter((e) => e.id !== edge.id)));
      }

      edgeUpdateSuccessful.current = true;
    },
    [currentPage?.edges, dispatch],
  );

  const onUndo = useCallback(() => {
    dispatch(flowActions.undo());
  }, [dispatch]);

  const onRedo = useCallback(() => {
    dispatch(flowActions.redo());
  }, [dispatch]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => dispatch(flowActions.onChangeEdges(applyEdgeChanges(changes, currentPage?.edges))),
    [currentPage?.edges, dispatch],
  );

  return {
    onNodeChange,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onUndo,
    onRedo,
    onEdgesChange,
    onNodeDragStop,
  };
};
