import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {
  createStore, applyMiddleware, combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getTodos } from '../api';
import { selectedTodoReducer } from './currentTodo';
import { actions as actionsLoading, loadingRuducer } from './loading';
import { actions as actionsTodos, todosReducer } from './todos';

const rootReducer = combineReducers({
  loading: loadingRuducer,
  selectedTodo: selectedTodoReducer,
  todos: todosReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const loadTodo = (dispatch: typeof store.dispatch) => {
  dispatch(actionsLoading.startLoading());
  getTodos()
    .then(
      peopleFromServer => dispatch(
        actionsTodos.setTodos(peopleFromServer),
      ),
    )
    .finally(() => {
      dispatch(actionsLoading.finishLoading());
    });
};
