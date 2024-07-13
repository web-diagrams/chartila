import 'reactflow/dist/style.css';

import ReactFlow, {
  applyEdgeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  EdgeChange,
  NodeChange,
  updateEdge,
} from 'reactflow';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Pages from '@/components/Pages/Pages';
import StartWindow from '../../../components/StartWindow/StartWindow';
import { useCallback, useEffect, useRef } from 'react';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { Edge } from '@reactflow/core/dist/esm/types/edges';
import { ContextMenu, useContextMenu } from '@/features/ContextMenu';
import { NodeTypes } from '../model/interface';

export const MainPage = () => {
  const { pages, currentPageId, selectedNodes } = useAppSelector((state) => state.flow);
  const dispatch = useAppDispatch();

  const edgeUpdateSuccessful = useRef(true);
  const currentPage = useCurrentPage(pages, currentPageId);

  const { contextMenuProps, onShowContextMenu, onCloseContextMenu } = useContextMenu();

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      dispatch(flowActions.onChangeEdges(updateEdge(oldEdge, newConnection, currentPage.edges)));
    },
    [currentPage],
  );

  const onEdgeUpdateEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        dispatch(flowActions.onChangeEdges(currentPage.edges.filter((e) => e.id !== edge.id)));
      }

      edgeUpdateSuccessful.current = true;
    },
    [currentPage],
  );

  const onClickOutSide = () => {
    onCloseContextMenu();
    if (selectedNodes.length) {
      dispatch(flowActions.onReleaseNodes());
    }
  };

  useEffect(() => {
    document.title = pages?.find((page) => page.id === currentPageId)?.pageName ?? 'Web diagrams';
  }, [currentPageId, pages]);

  return (
    <div style={{ height: '100vh', width: '100vw' }} onClick={onClickOutSide}>
      {currentPage ? (
        <>
          <ContextMenu state={contextMenuProps} />
          <ReactFlow
            nodes={currentPage.nodes}
            edges={currentPage.edges}
            onNodesChange={(changes: NodeChange[]) => dispatch(flowActions.onChangeNodes(changes))}
            onEdgesChange={(changes: EdgeChange[]) =>
              dispatch(flowActions.onChangeEdges(applyEdgeChanges(changes, currentPage.edges)))
            }
            onConnect={(changes: Connection) => dispatch(flowActions.onConnect(changes))}
            onNodesDelete={(e) => console.log(e)}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            fitView
            nodeTypes={NodeTypes}
            proOptions={{ hideAttribution: true }}
            onContextMenu={onShowContextMenu}
          >
            <Background variant={BackgroundVariant.Cross} />
            <Controls />
          </ReactFlow>
          <Pages />
        </>
      ) : (
        <StartWindow />
      )}
    </div>
  );
};
