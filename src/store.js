import { createStore } from 'redux';

export const actionTypes = {
  SET_TODOS: 'setTodos',
  DELETE_TODO: 'handleDelete',
};

const rootReduser = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.todos,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_BUTTON':
      return {
        ...state,
        buttonStatus: action.buttonStatus,
      };
    case 'SET_SORT_TYPE':
      return {
        ...state,
        selectedSort: action.selectedSort,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  isLoading: false,
  buttonStatus: true,
  selectedSort: 'id',
};

const store = createStore(rootReduser, initialState);

export default store;
