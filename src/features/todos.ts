import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET_TODOS',
  payload: Todo[]
};

type Action = SetTodosAction;

export const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return [...action.payload];
    default:
      return [...todos];
  }
};

export default todosReducer;
