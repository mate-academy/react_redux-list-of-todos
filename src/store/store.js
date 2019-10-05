import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// functions
import reducer from './reducer';
import getData from '../utils/api';
import getTodosWithUsers from '../utils/dataMappers';

// constants
import {
  initialState,
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_SORT,
  TODO_ITEM_DELETE,
} from './constants';

export const startLoading = () => ({
  type: START_LOADING,
});

export const handleSuccess = todosListFromServer => ({
  type: HANDLE_SUCCESS,
  todosListFromServer,
});

export const handleError = () => ({
  type: HANDLE_ERROR,
});

export const handleSort = typeOfSort => ({
  type: HANDLE_SORT,
  typeOfSort,
});

export const todoItemDelete = todoId => ({
  type: TODO_ITEM_DELETE,
  todoId,
});

export const loadData = () => (dispatch) => {
  dispatch(startLoading());
  Promise.all([
    getData('todos'),
    getData('users'),
  ])
    .then(([todos, users]) => {
      const todosListWithUsers = getTodosWithUsers(todos, users);
      dispatch(handleSuccess(todosListWithUsers));
    })
    .catch(() => dispatch(handleError()));
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
