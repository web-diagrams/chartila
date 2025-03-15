import 'reactflow/dist/style.css';
import styles from './DocPage.module.scss';

import ReactFlow, { Background, BackgroundVariant, Connection, Controls, SelectionMode } from 'reactflow';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Pages from '@/components/Pages/Pages';
import { useEffect } from 'react';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { ContextMenu, useContextMenu } from '@/features/ContextMenu';
import { NodeTypes } from '../model/interface';
import { CiCircleInfo } from 'react-icons/ci';
import { commonTexts } from '@/shared/consts/texts';
import { useKey } from '@/shared/hooks/useKey';
import { useSaveToFile } from '@/shared/hooks/useSaveToFile';
import { FaUndo, FaRedo } from 'react-icons/fa';
import { useGetFlowState } from '@/redux/flow/hooks/useGetFlowState';
import { useGetFlowCallbacks } from '../model/hooks/useGetFlowCallbacks';

const panOnDrag = [1, 2];

export const DocPage = () => {
  // const { onSave: saveToFile } = useSaveToFile();

  /** Save logic */
  useKey((event) => {
    if (event.ctrlKey && event.key === 's') {
      // saveToFile();
      dispatch(flowActions.onSave());
    }
  });

  const dispatch = useAppDispatch();
  const { pages, currentPageId, selectedNodes, isUpdated } = useGetFlowState();
  const currentPage = useCurrentPage(pages, currentPageId);
  const { history, step } = useAppSelector((state) => state.flow);

  const { contextMenuProps, onShowContextMenu, onCloseContextMenu } = useContextMenu();

  const flowCallbacks = useGetFlowCallbacks(history, step, currentPage);

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
      {currentPage && (
        <>
          <div>
            {isUpdated && (
              <CiCircleInfo title={commonTexts.unsaved} className={styles.saveIcon} size={35} color="red" />
            )}
          </div>
          <ContextMenu state={contextMenuProps} />
          <ReactFlow
            nodes={currentPage.nodes}
            edges={currentPage.edges}
            onNodesChange={flowCallbacks.onNodeChange}
            onNodesDelete={(e) => console.log(e)}
            onNodeDragStop={flowCallbacks.onNodeDragStop}
            onEdgesChange={flowCallbacks.onEdgesChange}
            onConnect={(changes: Connection) => dispatch(flowActions.onConnect(changes))}
            onEdgeUpdateStart={flowCallbacks.onEdgeUpdateStart}
            onEdgeUpdate={flowCallbacks.onEdgeUpdate}
            onEdgeUpdateEnd={flowCallbacks.onEdgeUpdateEnd}
            fitView
            nodeTypes={NodeTypes}
            proOptions={{ hideAttribution: true }}
            onContextMenu={onShowContextMenu}
            panOnScroll
            selectionOnDrag
            panOnDrag={panOnDrag}
            selectionMode={SelectionMode.Partial}
          >
            <Background variant={BackgroundVariant.Cross} />
            <Controls position="top-left">
              <div className={styles.controlsContainer}>
                <button onClick={flowCallbacks.onUndo} title="undo" className={styles.control} disabled={step === 0}>
                  <FaUndo size={12} />
                </button>
                <button
                  onClick={flowCallbacks.onRedo}
                  title="redo"
                  className={styles.control}
                  disabled={!(history?.length > step + 1)}
                >
                  <FaRedo size={12} />
                </button>
              </div>
            </Controls>
          </ReactFlow>
          <Pages />
        </>
      )}
    </div>
  );
};
