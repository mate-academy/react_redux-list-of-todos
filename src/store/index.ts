import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  LOAD_TODOS, REMOVE_TODO, SET_LOADED, SET_LOADING, SET_SORT_TYPE,
} from '../helpers/constants';

const initialState: RootState = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  sortType: '',
};

const rootReducer = (state = initialState, {
  type, isLoading, isLoaded, todos, sortType, id,
}: AnyAction) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading };

    case SET_LOADED:
      return { ...state, isLoaded };

    case LOAD_TODOS:
      return { ...state, todos };

    case SET_SORT_TYPE:
      return { ...state, sortType };

    case REMOVE_TODO:
      return { ...state, todos: [...state.todos].filter(todo => todo.id !== id) };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
