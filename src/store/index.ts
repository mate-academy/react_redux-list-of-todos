import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { filterReducer } from './filter';
import { loadingReducer } from './loading';
import { selectReducer } from './selectedTodo';
import { todosReducer } from './todos';

const rootReducer = combineReducers({
  todos: todosReducer,
  loading: loadingReducer,
  filter: filterReducer,
  selectedTodo: selectReducer,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ));

export type RootState = ReturnType<typeof rootReducer>;
