import { rtkApi } from './rtkApi';

export const pingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    ping: build.query<undefined, void>({
      query: () => `ping`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { usePingQuery } = pingApi;
