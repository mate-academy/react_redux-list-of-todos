import { createStore } from 'redux';

const GET_TODOS = 'GET_TODOS';

export const getTodos = todos => ({
  type: GET_TODOS,
  todos,
});

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
