import { createStore, compose } from 'redux';
import { Todo } from '../types/Todo';
import rootReducer from './reducers';

export interface RootState {
  todosList: {
    selectedUser: number | null,
    todos: Todo[],
  }
}

// eslint-disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(),
);

export default store;
