import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, Page } from "@/redux/listSlice/interface";
import { FlowState } from "../flowSlice/interface";


const initialState: InitialState = {
    id: '0',
    pages: []
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        updatePages: (state, action: PayloadAction<Page[]>) => {
            state.pages = action.payload
            state.id = action.payload[0].id
        },
        changePage: (state, action: PayloadAction<{ flowState: FlowState, newID: string }>) => {
            const { newID, flowState } = action.payload
            const currentPage = state.pages.find(page => page.id === state.id)
            currentPage.edges = flowState.edges
            currentPage.nodes = flowState.nodes
            state.id = newID
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase()
    // }
})
export const { actions: listActions } = listSlice

export default listSlice.reducer