import { createStore, AnyAction } from 'redux';
import { State } from './interfaces';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

const initialState = {
  todos: [],
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: action.value,
      };

    case DELETE_TODO:
      return {
        todos: state.todos.filter(item => item.id !== action.value),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, initialState);
