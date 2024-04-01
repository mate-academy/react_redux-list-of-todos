import { combineReducers, createStore } from 'redux';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';
import filterReducer from '../features/filter';

const reducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

export default store;
