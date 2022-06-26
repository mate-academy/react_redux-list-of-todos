/// <reference types="react-scripts" />

type Todo = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
};

interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

type OptionArray = ['all', 'active', 'completed'];

// redux
interface State {
  todos: Todo[],
  user: User | null
}

interface Action {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
}
