import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../react-app-env';

export const todoApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate.academy/stude2nts-api',
  }),
  endpoints: (build) => ({
    fetchTodos: build.query<Todo[], void>({
      query: () => '/todos',
    }),
  }),
});

export const { useFetchTodosQuery } = todoApi;
