import { createStore } from 'redux';
import { Action, ActionType } from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.DELETE_USER:
      return {
        ...state,
        todos: [...state.todos]
          .filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
