import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState } from '../utils/interfaces';
import {
  SET_TODOS,
  REMOVE_TODO,
  SET_IS_LOADED,
  SET_IS_LOADING,
  SET_USERS,
  SET_SORT_FIELD,
} from './actionTypes';


const initialState: RootState = {
  isLoaded: false,
  isLoading: false,
  todos: [],
  users: [],
  error: false,
  sortField: '',
};

function reducer(state: RootState = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload),
      };

    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
      };

    default:
      return state;
  }
}

export const store = createStore(reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)));
