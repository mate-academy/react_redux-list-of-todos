import {
  applyMiddleware, combineReducers, createStore, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getTodos, getUsers, deleteTodo as deleteTodoAPI } from '../api';
import todosReducer, {
  selectors as todosSelectors, actions as todosActions, TodosState,
} from './todos';
import userReducer, {
  selectors as userSelectors, actions as userActions, UserState,
} from './user';

export const loadTodos = () => (dispatch: Dispatch) => {
  getTodos().then((todos: Todo[]) => {
    dispatch(todosActions.setTodos(todos));
  });
};

export const loadUser = (userId: number) => (dispatch: Dispatch) => {
  getUsers(userId).then(
    (user: User) => {
      dispatch(userActions.setUser(user));
    },
    () => {
      dispatch(userActions.setUser(null));
    },
  );
};

export const deleteTodo = (todoId: number) => (dispatch: Dispatch) => {
  deleteTodoAPI(todoId).then(
    () => {
      loadTodos()(dispatch);
    },
  );
};

export const selectors = {
  getTodos: (state: CombinedState) => todosSelectors.getTodos(state.todos),
  getUser: (state: CombinedState) => userSelectors.getUser(state.user),
};

type CombinedState = {
  todos: TodosState,
  user: UserState,
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
