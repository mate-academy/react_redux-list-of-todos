import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { queryReducer, QueryState } from './query';
import { selectedUserReducer, SelectedUserState } from './selectedUser';
import { statusReducer, StatusState } from './status';
import { todosReducer, TodosState } from './todos';
import { usersReducer, UsersState } from './user';

export type RootState = {
  selectedUser: SelectedUserState,
  todos: TodosState,
  query: QueryState,
  status: StatusState,
  users: UsersState,
};

const rootReducer = combineReducers({
  selectedUser: selectedUserReducer,
  todos: todosReducer,
  query: queryReducer,
  status: statusReducer,
  users: usersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
