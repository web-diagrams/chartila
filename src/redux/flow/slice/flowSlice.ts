import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Connection, EdgeChange, NodeChange, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { FlowState, ICodeNode } from '../interfaces/flowStateInterfaces';
import { uploadFile } from '../services/uploadFile';
import { createNode } from '../flowUtils';

const initialState: FlowState = {
    nodes: null,
    edges: null
}

export const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        onInitState: (state) => {
            state.nodes = []
            state.edges = []
        },
        onUpdateState: (state, action: PayloadAction<FlowState>) => {
            state.nodes = action.payload.nodes
            state.edges = action.payload.edges
        },
        onChangeNodes: (state, action: PayloadAction<NodeChange[]>) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes)
        },
        onChangeEdges: (state, action: PayloadAction<EdgeChange[]>) => {
            state.edges = applyEdgeChanges(action.payload, state.edges)
        },
        onConnect: (state, action: PayloadAction<Connection>) => {
            state.edges = addEdge(action.payload, state.edges);
        },
        onAddNode: (state, action: PayloadAction<{ type: 'stringNode' | 'codeNode' }>) => {
            const { type } = action.payload
            createNode(state, type)
        },
        onChangeStringNode: (state, action: PayloadAction<{ id: string, value: string }>) => {
            const { id, value } = action.payload
            state.nodes.find(node => node.id === id).data.value = value
        },
        onChangeCodeNode: (state, action: PayloadAction<{ id: string, key: keyof ICodeNode, value: any }>) => {
            const { id, value, key } = action.payload
            state.nodes.find(node => node.id === id).data[key] = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.nodes = action.payload.nodes;
                state.edges = action.payload.edges;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                console.log(action.payload)
            });
    },
})

export const { actions: flowActions } = flowSlice
export const { reducer: flowReducer } = flowSlice
