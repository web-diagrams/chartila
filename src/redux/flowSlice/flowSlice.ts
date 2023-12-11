import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Connection, EdgeChange, Node, NodeChange, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { FlowState, ICodeNode } from './interface';
import { v1 } from 'uuid';

const initialState: FlowState = {
    nodes: null,
    edges: null
}

export const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        onStateUpdate: (state, action: PayloadAction<FlowState>) => {
            state.nodes = action.payload.nodes
            state.edges = action.payload.edges
        },
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
                        data: { value: '', id: id },
                        position: { x: 300, y: 50 },
                    })
                    break
                }
                case 'codeNode': {
                    const id = v1()
                    state.nodes.push({
                        id: id,
                        type: 'codeNode',
                        data: {
                            value: '',
                            id: id,
                            isWrapped: false
                        } as ICodeNode,
                        position: { x: 300, y: 50 },
                    })
                }
            }
        },
        onStringNodeChange: (state, action: PayloadAction<{ id: string, value: string }>) => {
            const { id, value } = action.payload
            state.nodes.find(node => node.id === id).data.value = value
        },
        onCodeNodeChange: (state, action: PayloadAction<{ id: string, key: keyof ICodeNode, value: any }>) => {
            const { id, value, key } = action.payload
            state.nodes.find(node => node.id === id).data[key] = value
        },

    },
})

// Action creators are generated for each case reducer function
export const { actions: flowActions } = flowSlice
export const { onNodesChange, onEdgesChange, onConnect } = flowSlice.actions

export default flowSlice.reducer