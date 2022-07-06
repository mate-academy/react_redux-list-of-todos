export enum TodosValue {
  all = 'All',
  completed = 'Completed',
  active = 'Active',
}

export type Todo = {
  id: number;
  createdAt: string;
  upDatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export type RootState = {
  todos: Todo[];
  user: User | null;
  todoId: number,
};
