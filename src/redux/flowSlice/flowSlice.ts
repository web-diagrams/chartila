import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Connection, EdgeChange, Node, NodeChange, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { FlowState } from './interface';
import { v1 } from 'uuid';

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
        onAddNode: (state, action: PayloadAction<{ type: 'stringNode' | 'codeNode' }>) => {
            const { type } = action.payload

            switch (type) {
                case 'stringNode': {
                    const id = v1()
                    state.nodes.push({
                        id: id,
                        type: 'stringNode',
                        data: { value: 'oleg', id: id },
                        position: { x: 300, y: 50 },
                    })
                }
            }
        },
        onStringNodeChange: (state, action: PayloadAction<{ id: string, value: string }>) => {
            const { id, value } = action.payload
            state.nodes.find(node => node.id === id).data.value = value
        }
    },
})

// Action creators are generated for each case reducer function
export const { actions: flowActions } = flowSlice
export const { onNodesChange, onEdgesChange, onConnect } = flowSlice.actions

export default flowSlice.reducer