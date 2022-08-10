import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { filterReducer } from './filter';
import { loadingReducer } from './loading';
import { selectedTodoReducer } from './selectedTodo';
import { todosReducer } from './todos';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers({
  todos: todosReducer,
  loading: loadingReducer,
  filter: filterReducer,
  selectedTodo: selectedTodoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof rootReducer>;
