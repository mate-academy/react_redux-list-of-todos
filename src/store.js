import { createStore } from 'redux';

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
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  isLoading: false,
  buttonStatus: true,
};

const store = createStore(rootReduser, initialState);

export default store;
