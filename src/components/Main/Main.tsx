import 'reactflow/dist/style.css';

import ReactFlow, {
    Controls,
    Background,
    NodeChange,
    EdgeChange,
    Connection,
} from 'reactflow';
import { onNodesChange, onEdgesChange, onConnect } from '@/features/flow/flowSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function Main() {
    const { nodes, edges } = useAppSelector((state) => state.flow)
    const dispatch = useAppDispatch()

    return (
        <div style={{ height: '97vh', width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(changes: NodeChange[]) => dispatch(onNodesChange(changes))}
                onEdgesChange={(changes: EdgeChange[]) => dispatch(onEdgesChange(changes))}
                onConnect={(changes: Connection) => dispatch(onConnect(changes))}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
            <div style={{width: '100vw', height: '30px', backgroundColor: 'red', display: 'flex', zIndex: 100, position: 'absolute'}}>
                <div>1</div>
                <div>2</div>
            </div>
        </div>
    );
}

export default Main;