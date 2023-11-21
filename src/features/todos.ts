import { Todo } from '../types/Todo';

export enum Actions {
  SET_TODOS = 'SET_TODOS',
}

const initialState = {
  todos: [],
};

export const actions = {
  setTodos: (todos:Todo[]) => ({
    type: Actions.SET_TODOS,
    todos,
  }),
};

export const todosReducer = (
  state = initialState,
  action:{ type:Actions, todos:Todo[] },
) => {
  switch (action.type) {
    case Actions.SET_TODOS:
      return { ...state, todos: action.todos };

    default: return state;
  }
};
