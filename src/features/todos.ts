import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET_TODOS',
  payload: Todo[],
};
type RemoveTodosAction = {
  type: 'todos/REMOVE_TODOS',
};
type Action = SetTodosAction | RemoveTodosAction;
type State = Todo[];

const setTodos = (
  todos: Todo[],
): SetTodosAction => ({ type: 'todos/SET_TODOS', payload: todos });
const removeTodos = (
): RemoveTodosAction => ({ type: 'todos/REMOVE_TODOS' });

export const actions = { setTodos, removeTodos };

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET_TODOS': {
      return action.payload;
    }

    case 'todos/REMOVE_TODOS': {
      return [];
    }

    default:
      return state;
  }
};

export default todosReducer;
