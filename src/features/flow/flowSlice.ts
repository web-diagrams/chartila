import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Connection, Edge, EdgeChange, Node, NodeChange, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';

export interface FlowState {
    nodes: Node[],
    edges: Edge[]
}

const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
];

const initialState: FlowState = {
    nodes: initialNodes,
    edges: []
}

export const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes)
        },
        onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
            state.edges = applyEdgeChanges(action.payload, state.edges)
        },
        onConnect: (state, action: PayloadAction<Connection>) => {
            state.edges = addEdge(action.payload, state.edges);
        },
    },
})

// Action creators are generated for each case reducer function
export const { onNodesChange, onEdgesChange, onConnect } = flowSlice.actions

export default flowSlice.reducer