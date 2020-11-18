import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { Todos, User } from '../components/interfaces';

import loadingReducer from './loadingPage';
import sortReducer from './sortTodos';
import todosReducer, { setTodos } from './setTodos';
import userReducer, { setUser } from './setUser';
import userIdReducer, { chooseUserId } from './chooseUserId';
import inputChangeReducer from './inputChange';

const rootReducer = combineReducers({
  loading: loadingReducer,
  sort: sortReducer,
  todos: todosReducer,
  user: userReducer,
  userId: userIdReducer,
  inputChange: inputChangeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getSort = (state: RootState) => state.sort;
export const getTodos = (state: RootState) => state.todos;
export const getUser = (state: RootState) => state.user;
export const setUserId = (state: RootState) => state.userId;
export const getInputChange = (state: RootState) => state.inputChange;

const ALL = 'ALL';
const COMPLETED = 'COMPLETED';
const NOT_COMPLETED = 'NOT_COMPLETED';

export const fetchTodo = (dataFromServer: any ) => {
  return (dispatch: Function) => { 
    dataFromServer()
      .then((data: Todos[]) => {
        dispatch(setTodos(data));
      })
  }
}

export const fetchUser = (dataFromServer: any, paramsOfData: number) => {
  return (dispatch: Function) => { 
    dataFromServer(paramsOfData)
      .then((data: User) => {
        dispatch(setUser(data));
        dispatch(chooseUserId(paramsOfData));
      })
  }
}

export const getSortTodos = (state: RootState) => {
  return [...state.todos].filter((todo) => {
    switch (state.sort) {
      case ALL:
        return todo;

      case COMPLETED:
        return todo.completed;

      case NOT_COMPLETED:
        return !todo.completed;
    
      default:
        return todo;
    }
  }).filter(todo =>todo.title !== null && todo.title.toLowerCase()
  .includes(state.inputChange.toLowerCase()));
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
