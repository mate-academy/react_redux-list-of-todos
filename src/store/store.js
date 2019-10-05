import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {
  initialState,
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_SORT,
} from './constants';

export const startLoading = () => ({
  type: START_LOADING,
});

export const handleSuccess = todosList => ({
  type: HANDLE_SUCCESS,
  todosList,
});

export const handleError = () => ({
  type: HANDLE_ERROR,
});

export const handleSort = typeOfSort => ({
  type: HANDLE_SORT,
  typeOfSort,
});

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
