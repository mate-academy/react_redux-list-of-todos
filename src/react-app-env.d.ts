// eslint-disable-next-line
/// <reference types="react-scripts" />
declare module 'lodash/debounce';

type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
};
