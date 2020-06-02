interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}

interface User {
  id: number;
  name: string;
}
