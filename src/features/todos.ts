import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type ClearTodosAction = {
  type: 'todos/CLEAR';
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const clearTodos = (): ClearTodosAction => ({
  type: 'todos/CLEAR',
});

type State = Todo[];
type Action = SetTodosAction | ClearTodosAction;

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET': {
      return action.payload;
    }

    case 'todos/CLEAR': {
      return [];
    }

    default:
      return state;
  }
};

export const actions = { setTodos, clearTodos };
export default todosReducer;
