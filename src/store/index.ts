import { Dispatch } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';
import filterReduser, { selector as filterSelectors } from './filter';
import selectedTodoReduser, { getSelectedTodo } from './selectedTodo';
import todosReduser, {
  actions as todosActions,
  selector as todosSelectors,
  TodosAction,
} from './todos';

export const action = {
  uploadTodos() {
    return (dispatch: Dispatch<TodosAction>) => {
      dispatch(todosActions.startLoadingTodosActionCreator());

      getTodos()
        .then(res => dispatch(todosActions.setTodosActionCreator(res)))
        .catch(err => dispatch(todosActions.errorLoadingActionCreator(err)))
        .finally(() => dispatch(todosActions.finishLoadingTodosCreator()));
    };
  },
};

const rootReducer = combineReducers({
  todosState: todosReduser,
  selectedTodo: selectedTodoReduser,
  filter: filterReduser,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getLoadingInfo: (state: RootState): boolean => todosSelectors
    .getIsLoading(state.todosState),
  getTodos: (state: RootState): Todo[] => todosSelectors
    .getTodos(state.todosState),
  getSelectedTodo: (state: RootState) => getSelectedTodo(state.selectedTodo),
  getQuery: (state: RootState) => filterSelectors.getQuery(state.filter),
  getFilterBy: (state: RootState) => filterSelectors
    .getfilteringBy(state.filter),
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
