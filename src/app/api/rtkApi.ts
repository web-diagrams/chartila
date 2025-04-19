import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandler } from './baseQueryWithErrorHandler';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: baseQueryWithErrorHandler,
  endpoints: () => ({}), // Пустой объект, так как эндпоинты будем добавлять позже
  tagTypes: ['Docs'],
});
