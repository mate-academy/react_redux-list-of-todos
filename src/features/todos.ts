/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todo/SET';
  payload: Todo[];
};

const setTodo = (todos: Todo[]): SetTodos => ({
  type: 'todo/SET',
  payload: todos,
});

export const actions = {
  setTodo,
};

type Actions = SetTodos;

type State = {
  todos: Todo[];
};

const initialState: State = {
  todos: [],
};

const todosReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'todo/SET':
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
