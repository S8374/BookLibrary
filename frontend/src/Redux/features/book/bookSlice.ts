import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../../types/BookTypes';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://booklibrarybackend.vercel.app' }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: '/books',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<Book, { id: string; updates: Partial<Book> }>({
      query: ({ id, updates }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Book', id },
        'Book',
      ],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;