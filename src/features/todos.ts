import { Todo } from '../types/Todo';

export const actions = {};

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

export const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[];
type Action = SetTodosAction;

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
