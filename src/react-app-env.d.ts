interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserFromServer {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface PreparedTodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserFromServer;
}
