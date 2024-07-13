import 'reactflow/dist/style.css';
import styles from './MainPage.module.scss';

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
import { CiCircleInfo } from 'react-icons/ci';
import { commonTexts } from '@/shared/consts/texts';
import { useKey } from '@/shared/hooks/useKey';
import { useSaveToFile } from '@/shared/hooks/useSaveToFile';

export const MainPage = () => {
  const { onSave: saveToFile } = useSaveToFile();

  /** Save logic */
  useKey((event) => {
    event.preventDefault();

    if (event.ctrlKey && event.key === 's') {
      saveToFile();
      dispatch(flowActions.onSave());
    }
  });

  const dispatch = useAppDispatch();
  const { pages, currentPageId, selectedNodes, isUpdated } = useAppSelector((state) => state.flow);

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
          {isUpdated && <CiCircleInfo title={commonTexts.unsaved} className={styles.saveIcon} size={35} color="red" />}
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
