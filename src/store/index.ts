import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { currentTodoReducer } from './currentTodo';
import { loadingReducer } from './loading';
import { todosReducer } from './todos';

const rootReducer = combineReducers({
  items: todosReducer,
  loading: loadingReducer,
  currentTodo: currentTodoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
