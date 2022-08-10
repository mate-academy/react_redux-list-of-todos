import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import { todosReducer } from './todos';

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: todosReducer,
  loading: loadingReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
