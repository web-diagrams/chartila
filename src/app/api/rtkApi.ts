import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080', credentials: "include" }), // Укажи нужный базовый URL
  endpoints: () => ({}), // Пустой объект, так как эндпоинты будем добавлять позже
});
