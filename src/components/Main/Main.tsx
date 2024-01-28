import 'reactflow/dist/style.css';

import ReactFlow, { Controls, Background, NodeChange, EdgeChange, Connection } from 'reactflow';
import { useAppDispatch } from '@/app/hooks';
import Pages from '@/components/Pages/Pages';
import { NodeTypes } from './interface';
import StartWindow from '../StartWindow/StartWindow';
import { useCallback } from 'react';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useSelector } from 'react-redux';
import { getFlow } from '@/redux/flow/selectors/getFlow';
import { getLastIndexOfQuestions } from '@/redux/flow/selectors/getCurrentPage';

function Main() {
  const { pages, currentPageId } = useSelector(getFlow);
  const dispatch = useAppDispatch();

  const currentPage = useSelector(getLastIndexOfQuestions);

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

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {currentPage ? (
        <>
          <div style={{ position: 'fixed', top: '15px', left: '15px', zIndex: '111' }}>
            <button onClick={() => dispatch(flowActions.onAddNode({ type: 'stringNode' }))}>
              Добавить текстовый инпут
            </button>
            <button onClick={() => dispatch(flowActions.onAddNode({ type: 'codeNode' }))}>
              Добавить инпут под код
            </button>
            <button onClick={saveToFile}>Сохранить страницу</button>
          </div>
          <ReactFlow
            nodes={currentPage.nodes}
            edges={currentPage.edges}
            onNodesChange={(changes: NodeChange[]) => dispatch(flowActions.onChangeNodes(changes))}
            onEdgesChange={(changes: EdgeChange[]) => dispatch(flowActions.onChangeEdges(changes))}
            onConnect={(changes: Connection) => dispatch(flowActions.onConnect(changes))}
            onNodesDelete={(e) => console.log(e)}
            fitView
            nodeTypes={NodeTypes}
          >
            <Background />
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
