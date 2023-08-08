export interface Todo {
  [index: string]: string | number | boolean;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
