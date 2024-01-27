import { createAsyncThunk } from '@reduxjs/toolkit';
import { Page } from '@/redux/list/interface';
import { FlowFile } from '../interfaces/dtoInterfaces';
import { listActions } from '@/redux/list/listSlice';

export const uploadFile = createAsyncThunk<Page, FileList, { rejectValue: string }>(
  'flow/uploadFile',
  async (fileList, thunkAPI) => {
    try {
      const response: FlowFile = await new Response(fileList[0]).json();

      if (!response.pages) {
        throw new Error();
      }

      thunkAPI.dispatch(listActions.setPages(response.pages));
      return response.pages[0];
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
