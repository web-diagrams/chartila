import { createAsyncThunk } from '@reduxjs/toolkit';
import { Page } from '../interfaces/docStateInterfaces';

export const uploadFile = createAsyncThunk<{ pages: Page[]; docName: string, id: string }, {fileList: FileList, id: string}, { rejectValue: string }>(
  'flow/uploadFile',
  async ({fileList, id}, thunkAPI) => {
    try {
      // Получаем первый файл из FileList
      const file = fileList[0];

      // Получаем название файла
      const fileName = file.name;

      // Читаем содержимое файла и преобразуем его в JSON
      const fileContent = await file.text();
      const response = JSON.parse(fileContent);

      // Проверяем, что ответ содержит pages
      if (!response.pages) {
        throw new Error('Invalid file format');
      }

      // Возвращаем данные, включая название файла
      return {
        pages: response.pages,
        docName: fileName.split('.')[0], // Добавляем название файла в ответ
        id,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
