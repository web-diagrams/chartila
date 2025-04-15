import { createAsyncThunk } from '@reduxjs/toolkit';
import { Page } from '../interfaces/docStateInterfaces';
import { DocDto } from '@/shared/types/doc';

export const uploadFile = createAsyncThunk<
  { pages: Page[]; docName: string; id: string },
  { doc: DocDto; fileName: string },
  { rejectValue: string }
>(
  'flow/uploadFile',
  async ({ doc, fileName }, thunkAPI) => {
    try {
      return {
        pages: doc.pages,
        docName: fileName.split('.')[0],
        id: doc.id,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
