// borrowApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BorrowBookRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
  userId: string;
  userEmail: string;
}

interface BorrowSummaryItem {
  bookId: string;
  title: string;
  isbn?: string;
  totalQuantity: number;
  borrows: {
    userEmail: string;
    quantity: number;
    dueDate: string;
    borrowedAt: string;
  }[];
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://booklibrarybackend.vercel.app",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, BorrowBookRequest>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrow"],
    }),
    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => "/borrow/summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;