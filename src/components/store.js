import { createStore } from 'redux';

// action types
const SET_TODOS = 'setTodos';

// action creators
export const setTodos = value => ({ type: SET_TODOS, value });

// selectors
export const getTodos = state => state.todos;

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.value };
    default:
      return state;
  }
};

const store = createStore(reducer, { todos: [] });
export default store;
