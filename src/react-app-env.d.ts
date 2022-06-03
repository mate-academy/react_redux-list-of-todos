/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
};

interface User {
  name: string,
  email: string,
  phone: string,
}

type RootState = {
  selectedUserId: number;
  todos: Todo[];
};
