import { createStore } from 'redux';

export const actionTypes = {
  SET_LOADING: 'setLoading',
  SET_TODOS: 'setTodos',
  DELETE_TODO: 'deleteTodo',
};

const initialState = {
  todos: [],
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };

    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    default:
      return state;
  }
};

export default createStore(reducer, initialState);
