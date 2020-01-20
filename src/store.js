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
    case 'SET_SORT_TYPE':
      return {
        ...state,
        selectedSort: action.selectedSort,
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
