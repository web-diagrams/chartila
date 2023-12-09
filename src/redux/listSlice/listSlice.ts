import {createSlice} from "@reduxjs/toolkit";
import {InitialState} from "@/redux/listSlice/interface";

const initialState: InitialState = {
    id: '0',
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    }
})

export const { setId } = listSlice.actions

export default listSlice.reducer