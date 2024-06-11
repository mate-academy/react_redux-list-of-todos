/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

const initialState: Todo[] = [];

type Actions = SetTodosAction;

const todosReducer = (state = initialState, actions: Actions): Todo[] => {
  switch (actions.type) {
    case 'todos/SET':
      return actions.payload;

    default:
      return state;
  }
};

export const actions = { setTodos };

export default todosReducer;
