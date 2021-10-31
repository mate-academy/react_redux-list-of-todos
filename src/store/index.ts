import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import selectedUserReducer from './selectedUser';
import todosReducer from './todos';

export type RootState = {
  selectedUserId: number;
  todos: {
    todos: Todo[];
    visibleTodos: Todo[];
    filterSettings: string;
  }
};

export const getVisibleTodos = (state: RootState) => state.todos.visibleTodos;
export const getSelectedUserId = (state: RootState) => state.selectedUserId;
export const getFilterSettings = (state: RootState) => state.todos.filterSettings;

const reducer = combineReducers({
  selectedUserId: selectedUserReducer,
  todos: todosReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
