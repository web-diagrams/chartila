import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Connection, NodeChange, applyNodeChanges, addEdge, getConnectedEdges, Edge, XYPosition } from 'reactflow';
import { CommonNodeDataType, FlowState, Page } from '../interfaces/flowStateInterfaces';
import { uploadFile } from '../services/uploadFile';
import { createNode } from '../flowUtils';
import { v1 } from 'uuid';
import { NodeData } from '../constants/constants';

const initialState: FlowState = {
  pages: null,
  currentPageId: null,
  selectedNodes: [],
  isUpdated: false,
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
      state.isUpdated = true;
    },
    onChangeEdges: (state, action: PayloadAction<Edge[]>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      if (currentPage) currentPage.edges = action.payload;
      state.isUpdated = true;
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      currentPage.edges = addEdge(action.payload, currentPage.edges);
      state.isUpdated = true;
    },
    onAddNode: (state, { payload }: PayloadAction<{ type: NodeData; position?: XYPosition }>) => {
      const { type, position } = payload;
      createNode({ state, type, position });
      state.isUpdated = true;
    },
    onDeleteNode: (state, action: PayloadAction<string>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      const id = action.payload;
      const nodeToDelete = currentPage.nodes.find((node) => node.id === id);
      const connectedEdges = getConnectedEdges([nodeToDelete], currentPage.edges);
      currentPage.nodes = currentPage.nodes.filter((node) => node !== nodeToDelete);
      currentPage.edges = currentPage.edges.filter((edge) => !connectedEdges.includes(edge));
      state.isUpdated = true;
    },

    onChangeNode: (state, action: PayloadAction<{ id: string; key: keyof CommonNodeDataType; value: unknown }>) => {
      const currentPage = state.pages.find((page) => page.id === state.currentPageId);
      const { id, value, key } = action.payload;

      if ((key === 'text' || key === 'color') && typeof value === 'string') {
        currentPage.nodes.find((node) => node.id === id).data[key] = value;
        state.isUpdated = true;
      }
    },

    onChangePage: (state, action: PayloadAction<string>) => {
      state.currentPageId = action.payload;
    },
    onSelectNode: (state, action: PayloadAction<string>) => {
      state.selectedNodes = [action.payload];
    },
    onReleaseNode: (state, action: PayloadAction<string>) => {
      state.selectedNodes = state.selectedNodes.filter((nodeId) => nodeId !== action.payload);
    },
    onReleaseNodes: (state) => {
      state.selectedNodes = [];
    },
    onAddPage: (state) => {
      const pageId = v1();
      state.pages.push({
        id: pageId,
        nodes: [],
        edges: [],
        pageName: 'New page',
      });
      state.currentPageId = pageId;
      state.isUpdated = true;
    },
    onChangePageName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.pages = state.pages.map((page) => (page.id === id ? { ...page, pageName: name } : page));
      state.isUpdated = true;
    },

    onSave: (state) => {
      state.isUpdated = false;
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
