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
    createDoc: build.mutation<undefined, DocDto>({
      query: (doc) => ({
        url: `doc/${doc.id}`,
        method: 'POST',
        body: doc,
      }),
    }),
    updateDoc: build.mutation<undefined, DocDto>({
      query: (doc) => ({
        url: `doc/${doc.id}`,
        method: 'POST',
        body: doc,
      }),
    }),
  }),
});

export const { useDocsQuery, useDocQuery, useCreateDocMutation, useUpdateDocMutation } = docsApi;
