import { combineReducers, createStore } from 'redux';

//reducers
import todos from '../features/todos';
import filter from '../features/filter';
import currentTodo from '../features/currentTodo';

const reducer = combineReducers({
  todos,
  filter,
  currentTodo,
});

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
