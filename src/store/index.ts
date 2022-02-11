import { createStore } from 'redux';

import { LOAD_TODOS, LOAD_USER, CHANGE_TODO_STATUS } from './actions';

const initialState: State = {
  todos: [],
  user: null,
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);

export default store;
