import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/Todo';

export const todosSlice = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate-academy.github.io/react_dynamic-list-of-todos/api',
  }),
  tagTypes: ['Todos'],

  endpoints: builder => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos.json',
      providesTags: ['Todos'],
    }),
  }),
});

export const { useGetTodosQuery } = todosSlice;
