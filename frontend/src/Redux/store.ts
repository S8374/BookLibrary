import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './features/user/userSlice';
import { bookApi } from './features/book/bookSlice';
import { borrowApi } from './features/borrow/borrowApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(bookApi.middleware)
      .concat(borrowApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;