import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

type Action = SetTodos;

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = {
  todos: Todo[],
};

const initialState: State = {
  todos: [],
};

const todosReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        todos: [...action.payload],
      };

    default:
      return state;
  }
};

export default todosReducer;
