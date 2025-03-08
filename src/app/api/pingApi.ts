import { rtkApi } from './rtkApi';

export const pingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    ping: build.query<undefined, undefined>({
      query: () => `ping`,
    }),
  }),
});

export const { usePingQuery } = pingApi;
