import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState, Page } from '@/redux/list/interface';
import { FlowState } from '../flow/interfaces/flowStateInterfaces';
import { v1 } from 'uuid';

const initialState: InitialState = {
  id: '0',
  pages: [],
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    initPages: (state) => {
      const id = v1();
      state.pages = [
        {
          id,
          pageName: 'New page',
          nodes: [],
          edges: [],
        },
      ];
      state.id = id;
    },
    setPages: (state, action: PayloadAction<Page[]>) => {
      state.pages = action.payload;
      state.id = action.payload[0].id;
    },
    changePage: (state, action: PayloadAction<{ flowState: FlowState; newID: string }>) => {
      const { newID, flowState } = action.payload;
      const currentPage = state.pages.find((page) => page.id === state.id);
      currentPage.edges = flowState.edges;
      currentPage.nodes = flowState.nodes;
      state.id = newID;
    },
  },
});
export const { actions: listActions, reducer: listReducer } = listSlice;
