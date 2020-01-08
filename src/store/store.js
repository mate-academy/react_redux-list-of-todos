import { createStore } from 'redux';

export const actionTypes = {
  SET_TODOS: 'setTodos',
};

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    default:
      return state;
  }
};

export default createStore(reducer, initialState);
