import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Connection,
  EdgeChange,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  getConnectedEdges,
} from 'reactflow';
import { FlowState, ICodeNode, Page } from '../interfaces/flowStateInterfaces';
import { uploadFile } from '../services/uploadFile';
import { createNode } from '../flowUtils';
import { v1 } from 'uuid';

const initialState: FlowState = {
  pages: null,
  currentPageId: null,
};

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    onInitState: (state) => {
      const pageId = v1();
      state.pages = [
        {
          id: pageId,
          nodes: [],
          edges: [],
          pageName: 'New page',
        },
      ];
      state.currentPageId = pageId;
    },
    onUpdateState: (state, action: PayloadAction<Page>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      currentPage.nodes = action.payload.nodes;
      currentPage.edges = action.payload.edges;
    },
    onChangeNodes: (state, action: PayloadAction<NodeChange[]>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      currentPage.nodes = applyNodeChanges(action.payload, currentPage.nodes);
    },
    onChangeEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      currentPage.edges = applyEdgeChanges(action.payload, currentPage.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      currentPage.edges = addEdge(action.payload, currentPage.edges);
    },
    onAddNode: (state, action: PayloadAction<{ type: 'stringNode' | 'codeNode' }>) => {
      const { type } = action.payload;
      createNode(state, type);
    },
    onDeleteNode: (state, action: PayloadAction<string>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      const id = action.payload;
      const nodeToDelete = currentPage.nodes.find((node) => node.id === id);
      const connectedEdges = getConnectedEdges([nodeToDelete], currentPage.edges);
      currentPage.nodes = currentPage.nodes.filter((node) => node !== nodeToDelete);
      currentPage.edges = currentPage.edges.filter((edge) => !connectedEdges.includes(edge));
    },

    onChangeNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const { id, color } = action.payload;
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      currentPage.nodes.find((node) => node.id === id).data.color = color;
    },

    onChangeStringNode: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      const { id, value } = action.payload;
      currentPage.nodes.find((node) => node.id === id).data.value = value;
    },
    onChangeCodeNode: (state, action: PayloadAction<{ id: string; key: keyof ICodeNode; value: any }>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      const { id, value, key } = action.payload;
      // currentPage.nodes.find((node) => node.id === id).data[key] = value;
    },

    onChangePage: (state, action: PayloadAction<string>) => {
      state.currentPageId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.pages = action.payload;
        state.currentPageId = action.payload[0].id;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { actions: flowActions, reducer: flowReducer } = flowSlice;
