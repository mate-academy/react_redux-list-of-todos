import thunk from 'redux-thunk';
import {
  createStore, applyMiddleware, combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  todosReducer,
  getTodos,
  getTodosError,
  getUserId,
  getTodosPending,
} from './todosList';
import {
  getUser, getUserError, getUserPending, userReducer,
} from './currentUser';
import { RooTStateT, TODOSTYPE, USERTYPE } from '../api/interface';
import {
  getFilteringType, getQueryFiltering, navReducer,
} from './navMenuTodo';

const rootReducer = combineReducers({
  todosState: todosReducer,
  userState: userReducer,
  navMenuState: navReducer,
});

// #region todosState selector
export const getTodosListPending
  = (state: RooTStateT): boolean => getTodosPending(state.todosState);
export const getTodosList = (state: RooTStateT): TODOSTYPE[] => getTodos(state.todosState);
export const getTodosListError
  = (state: RooTStateT): string | null => getTodosError(state.todosState);
export const getTodosListUserId = (state: RooTStateT): number => getUserId(state.todosState);
// #endregion

// #region userState selector
export const getCurrentUserPending
  = (state: RooTStateT): boolean => getUserPending(state.userState);
export const getCurrentUser = (state: RooTStateT): USERTYPE => getUser(state.userState);
export const getCurrentUserError
  = (state: RooTStateT): string | null => getUserError(state.userState);
// #endregion

// #region navMenuState selector
export const getNavMenuTypeFiltering
  = (state: RooTStateT): string => getFilteringType(state.navMenuState);
export const getQueryFilteringTodos
  = (state: RooTStateT): string => getQueryFiltering(state.navMenuState);
// #endregion

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
