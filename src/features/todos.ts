import { Action as BaseAction } from 'redux';
import { RootState } from '../app/store';
import { Todo } from '../types/Todo';

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum TodosActionType {
  LoadTodos = 'todos/load_todos',
  // AddTodo = 'todos/add_todo',
}

type LoadTodosAction = Action<TodosActionType.LoadTodos, Todo[]>;

type TodosActions = LoadTodosAction;

const loadTodosActionCreator = (todos: Todo[]): LoadTodosAction => ({
  type: TodosActionType.LoadTodos,
  payload: todos,
});

export const TODO_ACTIONS_CREATOR = {
  load: loadTodosActionCreator,
};

const todosReducer = (
  todosState: Todo[] = [],
  action: TodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.LoadTodos:
      return action.payload;

    default:
      return todosState;
  }
};

const todosSelector = (state: RootState): Todo[] => state.todos;

export const TODOS_SELECTORS = {
  todos: todosSelector,
};

export default todosReducer;
