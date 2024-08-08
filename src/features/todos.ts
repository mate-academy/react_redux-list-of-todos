/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

const initialState = [] as Todo[];

type SetTodosAction = {
  type: 'todos/set';
  payload: Todo[];
};

type Action = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/set',
  payload: todos,
});

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;
    default:
      return state;
  }
};

export const actions = { setTodos };
