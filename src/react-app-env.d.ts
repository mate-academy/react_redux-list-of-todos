type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
};

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type State = {
  todos: Todo[],
  user: User | null,
};
