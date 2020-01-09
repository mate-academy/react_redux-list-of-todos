import { createStore } from 'redux';

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROW':
      return {
        ...state,
        todos: action.todos,
      };

    case 'CHANGE_LOADED': {
      return {
        ...state,
        loaded: action.loaded,
      };
    }

    case 'CHANGE_IS_LOADING': {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  loaded: false,
  isLoading: false,
};

const store = createStore(rootReducer, initialState);

export default store;
