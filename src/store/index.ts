import {
  createStore, applyMiddleware, combineReducers, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { loaderReducer, actions as loaderActions } from './loaderReducer';
import { userReducer } from './currentTodoReducer';
import { TodosReducer, actions as TodosActions } from './TodosReducers';
import { getTodos } from '../api/api';

const rootReducer = combineReducers({
  loader: loaderReducer,
  selectTodo: userReducer,
  todos: TodosReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const loadTodo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loaderActions.startLoading());
    const todosFromServer = await getTodos();

    dispatch(TodosActions.setTodos(todosFromServer));
    dispatch(loaderActions.finishLoading());
  };
};
