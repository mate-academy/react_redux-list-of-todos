import { Todo } from "../types/Todo";

type TodosAction = {
  type: 'setTodos',
  payload: Todo[],
}

export const todosReducer = (
  todos: Todo[],
  action: TodosAction,
) => {
  switch (action.type) {
    case 'setTodos':
      return action.payload;

    default:
      return todos;
  }
}

export const actions = {
  setTodos: (todos: Todo[]): TodosAction => {
    return {
      type: 'setTodos',
      payload: todos,
    }
  }
}
