import { DocDto, DocInfoDto } from '@/shared/types/doc';
import { rtkApi } from './rtkApi';

export const docsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    docs: build.query<DocInfoDto[], undefined>({
      query: () => `docs`,
    }),
    doc: build.query<DocDto, { id: string }>({
      query: ({ id }) => `doc/${id}`,
    }),
    createDoc: build.mutation<undefined, { id: string }>({
      query: ({ id }) => ({
        url: `doc/${id}`,
        method: 'POST',
        body: undefined,
      }),
    }),
  }),
});

export const { useDocsQuery, useLazyDocQuery, useCreateDocMutation } = docsApi;
