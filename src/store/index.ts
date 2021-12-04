import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { queryReducer, QueryState } from './query';
import { selectedUserReducer, SelectedUserState } from './selectedUser';
import { statusReducer, StatusState } from './status';
import { todosReducer, TodosState } from './todos';
import { usersReducer, UsersState } from './user';

export type RootState = {
  selectedUser: SelectedUserState;
  todos: TodosState;
  query: QueryState;
  status: StatusState;
  users: UsersState;
};

// rootReducer - this function is called after dispatching an action

const rootReducer = combineReducers({
  selectedUser: selectedUserReducer,
  todos: todosReducer,
  query: queryReducer,
  status: statusReducer,
  users: usersReducer,
});

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
