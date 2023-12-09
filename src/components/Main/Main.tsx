import 'reactflow/dist/style.css';

import ReactFlow, {
    Controls,
    Background,
    NodeChange,
    EdgeChange,
    Connection,
} from 'reactflow';
import { onNodesChange, onEdgesChange, onConnect } from '@/redux/flowSlice/flowSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Lists from "@/components/Lists/Lists";

function Main() {
    const { nodes, edges } = useAppSelector((state) => state.flow)
    const dispatch = useAppDispatch()

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
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
            <Lists />
        </div>
    );
}

export default Main;