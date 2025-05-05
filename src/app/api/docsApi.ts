import { DocDto, DocInfoDto } from '@/shared/types/doc';
import { rtkApi } from './rtkApi';

export const docsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    docs: build.query<DocInfoDto[], undefined>({
      query: () => `docs`,
      providesTags: ['Docs'],
      keepUnusedDataFor: 0,
    }),
    doc: build.query<DocDto, { id: string }>({
      query: ({ id }) => `doc/${id}`,
      keepUnusedDataFor: 0,
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
        method: 'PUT',
        body: doc,
      }),
    }),
    deleteDoc: build.mutation<undefined, { id: string }>({
      query: ({ id }) => ({
        url: `doc/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Docs'],
    }),
  }),
});

export const { useDocsQuery, useDocQuery, useCreateDocMutation, useUpdateDocMutation, useDeleteDocMutation } = docsApi;
