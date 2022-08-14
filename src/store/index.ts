import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todoReducer } from './currentTodo';
import { loadingReducer } from './loading';

const rootReducer = combineReducers({
  currentTodo: todoReducer,
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
