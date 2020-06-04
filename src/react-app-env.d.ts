interface User {
  id: number | null;
  name: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface CompletedTodo extends Todo {
  user: User;
}
