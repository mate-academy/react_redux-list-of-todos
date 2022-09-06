import { Todo } from '../Types/Todo';

type RootState = Todo[] | [];

type SetTodos = {
  type: 'todos/SetTodos',
  payload: Todo[],
};

type Action = SetTodos;

export const todosActions = {
  SetTodos: (todos: Todo[]) => ({ type: 'todos/SetTodos', payload: todos }),
};

const todosReducer = (state:RootState = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SetTodos':
      return [...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
