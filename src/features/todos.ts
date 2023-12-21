import { Todo } from '../types/Todo';

type SetTodo = {
  type: 'todo/SET',
  payload: Todo[],
};

const setTodo = (value: Todo[]): SetTodo => (
  { type: 'todo/SET', payload: value }
);

const todosReducer = (todos: Todo[] = [], action: SetTodo): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return [...action.payload];
    default:
      return todos;
  }
};

export const actions = { setTodo };
export default todosReducer;
