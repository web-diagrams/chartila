import { configureStore } from '@reduxjs/toolkit';
import { flowReducer } from '@/redux/flow/slice/flowSlice';
import { listReducer } from '@/redux/list/listSlice';

export const store = configureStore({
  reducer: {
    flow: flowReducer,
    list: listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
