import {
  Dispatch, Action as BaseAction,
  combineReducers, createStore, applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum TodosActionType {
  SetTodos = 'todos/set_todos',
}
// const ALL_TODOS = 'todos/set_todos';

export type SetTodosAction = Action<TodosActionType.SetTodos, Todo[]>;

type TodosActions = SetTodosAction;

const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

export const fetchTodos = () => {
  return (dispatch: Dispatch) => {
    getTodos().then(todosFromServer => dispatch(
      setTodosActionCreator(todosFromServer),
    ));
  };
};

export const TODO_ACTIONS_CREATOR = {
  set: setTodosActionCreator,
};

const todosReducer = (
  todosState: Todo[] = [],
  action: TodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodos:
      return [...action.payload];
    default:
      return todosState;
  }
};

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const todosSelector = (state: RootState): Todo[] => state.todos;

const todosBySearchQuery = (query: string) => {
  return (state: RootState) => {
    return state.todos
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  };
};

export const TODOS_SELECTORS = {
  todos: todosSelector,
  todosBySearchQuery,
};

export default todosReducer;
