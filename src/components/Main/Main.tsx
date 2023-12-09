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

function Main() {
    const { nodes, edges } = useAppSelector((state) => state.flow)
    const dispatch = useAppDispatch()

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div style={{ position: 'fixed', top: '15px', left: '15px', zIndex: '111' }}>
                <button onClick={() => dispatch(flowActions.onAddNode({ type: 'stringNode' }))}>Добавить текстовый инпут</button>
                <button onClick={() => dispatch(flowActions.onAddNode({ type: 'codeNode' }))}>Добавить инпут под код</button>
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
        </div>
    );
}

export default Main;