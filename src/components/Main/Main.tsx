import 'reactflow/dist/style.css';

import ReactFlow, {
    Controls,
    Background,
    NodeChange,
    EdgeChange,
    Connection,
} from 'reactflow';
import { onNodesChange, onEdgesChange, onConnect, flowActions } from '@/redux/flowSlice/flowSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Lists from "@/components/Lists/Lists";
import { NodeTypes } from './interface';
import StartWindow from '../StartWindow/StartWindow';
import { useCallback } from 'react';

function Main() {
    const { nodes, edges } = useAppSelector((state) => state.flow)
    const { pages } = useAppSelector((state) => state.list)
    const dispatch = useAppDispatch()

    const saveToFile = useCallback(() => {
        // create file in browser
        const fileName = "random";
        const json = JSON.stringify({ pages: pages }, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }, [pages])

    return (
        <div style={{ height: '100vh', width: '100vw' }}>

            {nodes ?
                <>
                    <div style={{ position: 'fixed', top: '15px', left: '15px', zIndex: '111' }}>
                        <button onClick={() => dispatch(flowActions.onAddNode({ type: 'stringNode' }))}>Добавить текстовый инпут</button>
                        <button onClick={() => dispatch(flowActions.onAddNode({ type: 'codeNode' }))}>Добавить инпут под код</button>
                        <button onClick={saveToFile}>Сохранить страницу</button>
                    </div>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={(changes: NodeChange[]) => dispatch(onNodesChange(changes))}
                        onEdgesChange={(changes: EdgeChange[]) => dispatch(onEdgesChange(changes))}
                        onConnect={(changes: Connection) => dispatch(onConnect(changes))}
                        fitView
                        nodeTypes={NodeTypes}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                    <Lists />
                </> : <StartWindow />
            }
        </div>
    );
}

export default Main;