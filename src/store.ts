
import { createStore, AnyAction } from 'redux';
import { State } from './interfaces';
import { SET_TODOS, REMOVE_TODO } from './constants';

const initialState: State = {
  todos: [],
};

function reducer(state: State = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_TODOS:
      return {
        todos: action.value,
      };
    case REMOVE_TODO:
      return {
        todos: state.todos.filter(item => item.id !== action.value),
      };

    default:
      return state;
  }
}

export const store = createStore(reducer, initialState);
