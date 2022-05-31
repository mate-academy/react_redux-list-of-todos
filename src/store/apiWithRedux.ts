import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ToDo } from '../types/ToDo';
import { User } from '../types/User';

const baseUrl = 'https://mate.academy/students-api';

export const toDosApi = createApi({
  reducerPath: 'toDosApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getToDos: builder.query<Array<ToDo>, string>({
      query: () => '/todos',
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetToDosQuery, useGetUserByIdQuery } = toDosApi;
