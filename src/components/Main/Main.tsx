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
import { NodeTypes } from './interface';
import StartWindow from '../StartWindow/StartWindow';
import { useCallback, useEffect, useRef } from 'react';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { NodeData } from '@/redux/flow/constants/constants';
import Button from '@/shared/Button';
import { Edge } from '@reactflow/core/dist/esm/types/edges';

function Main() {
  const { pages, currentPageId, selectedNodes } = useAppSelector((state) => state.flow);
  const dispatch = useAppDispatch();

  const edgeUpdateSuccessful = useRef(true);
  const currentPage = useCurrentPage(pages, currentPageId);

  const saveToFile = useCallback(() => {
    const fileName = 'random';

    const json = JSON.stringify({ pages: pages }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [pages, currentPageId]);

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
          <div style={{ display: 'flex', position: 'fixed', top: '15px', left: '15px', zIndex: '111' }}>
            <Button onClick={() => dispatch(flowActions.onAddNode({ type: NodeData.STRING_NODE }))}>
              Добавить текстовый инпут
            </Button>
            <Button onClick={() => dispatch(flowActions.onAddNode({ type: NodeData.CODE_NODE }))}>
              Добавить инпут под код
            </Button>
            <Button onClick={saveToFile}>Сохранить страницу</Button>
          </div>
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
}

export default Main;
