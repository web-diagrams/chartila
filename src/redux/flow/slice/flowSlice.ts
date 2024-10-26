import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Connection, NodeChange, applyNodeChanges, addEdge, getConnectedEdges, Edge, XYPosition } from 'reactflow';
import { CommonNodeDataType, FlowState, HistoryState } from '../interfaces/flowStateInterfaces';
import { uploadFile } from '../services/uploadFile';
import { stateToHistory, getNewNode, getCurrentPage } from '../flowUtils';
import { v1 } from 'uuid';
import { NodeData } from '../constants/constants';
import { cloneDeep } from 'lodash';

const getDefaultState = (): FlowState => ({
  pages: null,
  currentPageId: null,
  selectedNodes: [],
  isUpdated: false,
});

const initialState: HistoryState = {
  history: [getDefaultState()],
  currentState: getDefaultState(),
  step: 0,
};

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    onInitState: (state) => {
      const currentState = state.currentState;
      const pageId = v1();
      currentState.pages = [
        {
          id: pageId,
          nodes: [],
          edges: [],
          pageName: 'New page',
        },
      ];
      currentState.currentPageId = pageId;
      state.history[0] = cloneDeep(state.currentState);
    },
    onSetState: (state, { payload }: PayloadAction<FlowState>) => {
      state.currentState = payload;
    },
    onChangeNodes: (state, { ['payload']: { changes } }: PayloadAction<{ changes: NodeChange[] }>) => {
      const currentPage = getCurrentPage(state);
      currentPage.nodes = applyNodeChanges(changes, currentPage.nodes);

      state.currentState.isUpdated = true;
    },
    onSaveChangeNodes: (state) => {
      // const newNodes = applyNodeChanges(changes, currentPage?.nodes).map((node) => getNodeInfo(node));
      // const newHash = JSON.stringify(newNodes);
      // const currentHash = JSON.stringify(currentPage.nodes.map((node) => getNodeInfo(node)));
      // if (newHash !== currentHash) {
      //   currentState = getNewState(state);
      //   currentPage = currentState.pages.find((page) => page.id === currentState.currentPageId);
      // }
    },
    onChangeEdges: (state, action: PayloadAction<Edge[]>) => {
      const currentPage = getCurrentPage(state);
      if (currentPage) currentPage.edges = action.payload;
      state.currentState.isUpdated = true;
      // addStep(state);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const currentPage = getCurrentPage(state);
      currentPage.edges = addEdge(action.payload, currentPage.edges);
      state.currentState.isUpdated = true;
      // addStep(state);
    },
    onAddNode: (state, { payload }: PayloadAction<{ type: NodeData; position: XYPosition }>) => {
      const { type, position } = payload;

      const currentPage = getCurrentPage(state);
      const newNode = getNewNode({ type, position });
      currentPage.nodes.push(newNode);

      state.currentState.isUpdated = true;
      stateToHistory(state); // запоминаем состояние в истории
    },
    onDeleteNode: (state, action: PayloadAction<string>) => {
      const currentPage = getCurrentPage(state);
      const id = action.payload;
      const nodeToDelete = currentPage.nodes.find((node) => node.id === id);

      currentPage.nodes = currentPage.nodes.filter((node) => node !== nodeToDelete); // удялем ноуду

      const connectedEdges = getConnectedEdges([nodeToDelete], currentPage.edges);
      currentPage.edges = currentPage.edges.filter((edge) => !connectedEdges.includes(edge)); // удялем связи

      state.currentState.isUpdated = true;
      stateToHistory(state); // запоминаем состояние в истории
    },

    onChangeNode: (state, action: PayloadAction<{ id: string; key: keyof CommonNodeDataType; value: unknown }>) => {
      const currentPage = getCurrentPage(state);
      const { id, value, key } = action.payload;

      if ((key === 'text' || key === 'color') && typeof value === 'string') {
        currentPage.nodes.find((node) => node.id === id).data[key] = value;
        state.currentState.isUpdated = true;
      }
      // addStep(state);
    },

    onSelectNode: (state, action: PayloadAction<string>) => {
      state.currentState.selectedNodes = [action.payload];
    },
    onReleaseNode: (state, action: PayloadAction<string>) => {
      state.currentState.selectedNodes = state.currentState.selectedNodes.filter((nodeId) => nodeId !== action.payload);
    },
    onReleaseNodes: (state) => {
      state.currentState.selectedNodes = [];
    },

    onChangePage: (state, action: PayloadAction<string>) => {
      state.currentState.currentPageId = action.payload;
      // addStep(state);
    },
    onAddPage: (state) => {
      const currentState = state.currentState;
      const pageId = v1();
      currentState.pages.push({
        id: pageId,
        nodes: [],
        edges: [],
        pageName: 'New page',
      });
      currentState.currentPageId = pageId;
      currentState.isUpdated = true;
      // addStep(state);
    },
    onChangePageName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const currentState = state.currentState;
      const { id, name } = action.payload;
      currentState.pages = currentState.pages.map((page) => (page.id === id ? { ...page, pageName: name } : page));
      currentState.isUpdated = true;
      // addStep(state);
    },

    onSave: (state) => {
      state.currentState.isUpdated = false;
    },

    undo: (state) => {
      state.step -= 1;
      state.currentState = state.history[state.step];
    },
    redo: (state) => {
      state.step += 1;
      state.currentState = state.history[state.step];
    },
    onSaveStateToHistory: (state) => {
      stateToHistory(state); // запоминаем состояние в истории
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        const currentState = state.currentState;
        currentState.pages = action.payload;
        currentState.currentPageId = action.payload[0].id;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { actions: flowActions, reducer: flowReducer } = flowSlice;
