import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../redux/list/listSlice'
import { flowReducer } from '@/redux/flow/slice/flowSlice'


export const store = configureStore({
    reducer: {
        flow: flowReducer,
        list: listReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch