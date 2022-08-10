import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todosReducer } from './todos';
import { loadingReducer } from './loading';
import { currentTodoReducer } from './currentTodo';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  loading: loadingReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
