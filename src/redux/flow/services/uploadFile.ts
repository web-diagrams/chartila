import { createAsyncThunk } from '@reduxjs/toolkit';
import { Page } from '../interfaces/flowStateInterfaces';

export const uploadFile = createAsyncThunk<Page[], any, { rejectValue: string }>(
  'flow/uploadFile',
  async (fileList, thunkAPI) => {
    try {
      const response = await new Response(fileList[0]).json();

      if (!response.pages) {
        throw new Error();
      }

      return response.pages as Page[];
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
