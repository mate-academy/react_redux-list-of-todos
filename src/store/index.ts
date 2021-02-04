import thunk from 'redux-thunk';
import {
  createStore, applyMiddleware, combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  todosReducer,
  getTodos,
  getTodosError,
  getTodosPending,
  getFilteringType,
  getQueryFiltering,
} from './todosList';
import {
  getUser,
  getUserId,
  getUserError,
  getUserPending,
  userReducer,
} from './currentUser';
import { RooTStateT, TODOSTYPE, USERTYPE } from '../api/interface';

const rootReducer = combineReducers({
  todosState: todosReducer,
  userState: userReducer,
});

// #region todosState selector
export const getTodosListPending
  = (state: RooTStateT): boolean => getTodosPending(state.todosState);
export const getTodosList = (state: RooTStateT): TODOSTYPE[] => getTodos(state.todosState);
export const getTodosListError
  = (state: RooTStateT): string | null => getTodosError(state.todosState);
export const getNavMenuTypeFiltering
  = (state: RooTStateT): string => getFilteringType(state.todosState);
export const getQueryFilteringTodos
  = (state: RooTStateT): string => getQueryFiltering(state.todosState);
  // #endregion

// #region userState selector
export const getCurrentUserId = (state: RooTStateT): number => getUserId(state.userState);
export const getCurrentUserPending
  = (state: RooTStateT): boolean => getUserPending(state.userState);
export const getCurrentUser = (state: RooTStateT): USERTYPE => getUser(state.userState);
export const getCurrentUserError
  = (state: RooTStateT): string | null => getUserError(state.userState);
// #endregion

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
