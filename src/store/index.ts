import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todosReduser } from './loadTodos';
import { loadingTodos } from './_loading';

const rootReducer = combineReducers({
  todos: todosReduser,
  loading: loadingTodos,
});

export const selectors = {
  isLoading: (state: RootState) => state.loading,
  getTodos: (state: RootState) => state.todos,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
