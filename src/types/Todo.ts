export interface Todo {
  [x: string]: unknown;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
