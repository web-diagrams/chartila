import 'reactflow/dist/style.css';
import styles from './Diagram.module.scss';

import ReactFlow, { Background, BackgroundVariant, Connection, Controls, SelectionMode } from 'reactflow';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { CiCircleInfo } from 'react-icons/ci';
import { commonTexts } from '@/shared/consts/texts';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useGetFlowCallbacks } from '../model/hooks/useGetFlowCallbacks';
import { NodeTypes } from '../model/interface';
import { DiagramButtons } from '@/features/DiagramButtons/DiagramButtons';
import { useContextMenu } from '@/shared/ContextMenu';
import { useKeyboard } from '../model/hooks/useKeyboard';
import { FloatingToolbar } from '@/components/FloatingToolbar/FloatingToolbar';
import { PageSettings } from '@/components/PageSettings/PageSettings';
import { DiagramContextMenu } from '@/features/DiagramContextMenu/DiagramContextMenu';

const panOnDrag = [1, 2];

interface DiagramProps {
  onSave: () => void;
}

export const Diagram = ({
  onSave,
}: DiagramProps) => {
  const { pages, currentPageId, isUpdated, selectedNodes } = useGetDocState();
  const currentPage = useCurrentPage(pages, currentPageId);
  const { history, step } = useAppSelector((state) => state.doc);

  if (!currentPage) {
    return <p>Страница не подготовлена</p>
  }

  const dispatch = useAppDispatch();

  useKeyboard({ onSave });

  const { contextMenuProps, onShowContextMenu, onCloseContextMenu, onNodeContextMenu } = useContextMenu();

  const flowCallbacks = useGetFlowCallbacks(history, step, currentPage);

  const onClickOutSide = () => {
    onCloseContextMenu();
    if (selectedNodes.length) {
      dispatch(docActions.onReleaseNodes());
    }
  };

  useEffect(() => {
    () => {
      dispatch(docActions.onResetState());
    }
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw' }} onClick={onClickOutSide}>
      <div>
        {isUpdated && (
          <CiCircleInfo title={commonTexts.unsaved} className={styles.saveIcon} size={35} color="red" />
        )}
      </div>
      <PageSettings />
      <DiagramContextMenu state={contextMenuProps} />
      <ReactFlow
        nodes={currentPage.nodes}
        edges={currentPage.edges}
        onNodesChange={flowCallbacks.onNodeChange}
        onNodesDelete={(e) => console.log(e)}
        onNodeDragStop={flowCallbacks.onNodeDragStop}
        onSelectionDragStop={flowCallbacks.onSelectionDragStop}
        onEdgesChange={flowCallbacks.onEdgesChange}
        onConnect={(changes: Connection) => dispatch(docActions.onConnect(changes))}
        onEdgeUpdateStart={flowCallbacks.onEdgeUpdateStart}
        onEdgeUpdate={flowCallbacks.onEdgeUpdate}
        onEdgeUpdateEnd={flowCallbacks.onEdgeUpdateEnd}
        fitView
        nodeTypes={NodeTypes}
        proOptions={{ hideAttribution: true }}
        onContextMenu={onShowContextMenu}
        onNodeContextMenu={onNodeContextMenu}
        panOnScroll
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
      >
        <Background variant={BackgroundVariant.Cross} />
        <Controls position="top-left">
          <DiagramButtons
            onUndo={flowCallbacks.onUndo}
            onRedo={flowCallbacks.onRedo}
            onSave={onSave}
          />
        </Controls>
      </ReactFlow>
      <FloatingToolbar selectedNodesLength={selectedNodes.length} />
    </div>
  );
};
