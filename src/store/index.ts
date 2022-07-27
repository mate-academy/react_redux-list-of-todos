import {
  applyMiddleware, combineReducers, createStore, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getTodos, getUser, removeTodo } from '../api/api';

import todosReducer, {
  selectors as todosSelectors,
  actions as todosActions,
  TodosState,
} from './todos';

import userReducer, {
  selectors as userSelectors,
  actions as userActions,
  UserState,
} from './users';

type CombinedState = {
  todos: TodosState,
  user: UserState,
};

export const loadTodos = () => (dispatch: Dispatch) => {
  getTodos()
    .then((todos) => {
      dispatch(todosActions.setTodos(todos));
    });
};

export const loadUser = (userId: number) => (dispatch: Dispatch) => {
  getUser(userId)
    .then((user) => {
      dispatch(userActions.setUser(user));
    });
};

export const deleteTodo = (todoId: number) => (dispatch: Dispatch) => {
  removeTodo(todoId)
    .then(() => {
      loadTodos()(dispatch);
    });
};

export const selectors = {
  getTodos: (state: CombinedState) => todosSelectors.getTodos(state.todos),
  getUser: (state: CombinedState) => userSelectors.getUser(state.user),
};

const reducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
