import { Todo } from '../types/Todo';

export const getTodoById = (todos: Todo[], id: number) => {
  return todos.find(todo => todo.id === id)!;
};
