import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type Action = SetTodosAction;
type State = Todo[];

const todosReducer = (state: State = [], action: Action) => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = {
  setTodos,
};

export default todosReducer;
