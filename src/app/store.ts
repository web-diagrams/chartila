import { configureStore } from '@reduxjs/toolkit';
import { docReducer } from '@/redux/doc/slice/docSlice';
import { rtkApi } from './api/rtkApi';

export const store = configureStore({
  reducer: {
    doc: docReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
