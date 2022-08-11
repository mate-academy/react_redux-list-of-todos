import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { filterReducer } from './filterReducer';
import { loadingReducer } from './loadingReducer';
import { todosReducer } from './todosReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  loading: loadingReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
