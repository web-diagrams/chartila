import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'include',
});

export const baseQueryWithErrorHandler: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error as any;

    if (status >= 500) {
      toast.error('Сервер не отвечает. Попробуйте позже.');
    } else if (status === 401) {
      toast.error('Вы не авторизованы.');
    } else if (status === 403) {
      toast.error('Нет доступа.');
    } else if (status === 400) {
      toast.error(data?.message ?? 'Сервер не может обработать этот запрос');
    }
  }

  return result;
};
