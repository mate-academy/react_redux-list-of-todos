import { Action as ActionBase } from 'redux';
// import { RootState } from '../app/store';
import { Todo } from '../types/Todo';

interface Action<T, P> extends ActionBase<T> {
  payload: P,
}

export enum TodosActionsTypes {
  SetTodo = 'todos/set_todos',
}

export type SetTodosAction = Action<TodosActionsTypes.SetTodo, Todo[]>;

const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionsTypes.SetTodo,
  payload: todos,
});

export const TODO_ACTIONS = {
  set: setTodosActionCreator,
};

type TodosActions = SetTodosAction;

export const todosReducer = (
  todosState: Todo[] = [],
  actions: TodosActions,
): Todo[] => {
  switch (actions.type) {
    case TodosActionsTypes.SetTodo:
      return actions.payload;

    default:
      return todosState;
  }
};

// const todosSelector = (state: RootState) => state.todos;

// export const TODOS_SELECTOR = {
//   todos: todosSelector,
// };

export default todosReducer;
