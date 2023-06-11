import { Todo } from '../types/Todo';

export enum TodosActionTypes {
  load = 'todos/LOAD',
}

type SetTodos = { type: TodosActionTypes.load, payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodos => ({
  type: TodosActionTypes.load,
  payload: todos,
});

type Action = SetTodos;

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case TodosActionTypes.load:
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
