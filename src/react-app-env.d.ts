// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo extends TodoFromServer {
  user: User;
}

interface TodoFromServer {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number | null;
  username: string;
}

interface SortButton {
  name: string;
  field: SortFields;
}
