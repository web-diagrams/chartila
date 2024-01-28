import { configureStore } from '@reduxjs/toolkit';
import { flowReducer } from '@/redux/flow/slice/flowSlice';
import { StateSchema } from './StateSchema';

export const store = configureStore<StateSchema>({
  reducer: {
    flow: flowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
