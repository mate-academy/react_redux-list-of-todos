import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import
TodosReducer,
{ selectors as todosSelectors } from './TodosReducer';
import { Todo } from '../types/Todo';

export const selectors = {
  setTodo(state: { todoId: number }) {
    return todosSelectors.setTodo(state.todoId);
  },

  getTodo(state: { todos: Todo[] }) {
    return todosSelectors.getTodo(state.todos);
  },
};

const reducer = combineReducers({
  todos: TodosReducer,
});

export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export type RootState = ReturnType<typeof reducer>;
