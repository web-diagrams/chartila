import { configureStore } from '@reduxjs/toolkit'
import flowReducer from '../redux/flowSlice/flowSlice'
import listReducer from '../redux/listSlice/listSlice'


export const store = configureStore({
    reducer: {
        flow: flowReducer,
        list: listReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch