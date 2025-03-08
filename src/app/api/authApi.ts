import { UserInfo } from '@/shared/types/userInfo';
import { rtkApi } from './rtkApi';

export const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<undefined, UserInfo>({
      query: (userInfo) => ({
        url: '/registration',
        method: 'POST',
        body: userInfo,
      }),
    }),
    login: build.mutation<undefined, UserInfo>({
      query: (userInfo) => ({
        url: '/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
