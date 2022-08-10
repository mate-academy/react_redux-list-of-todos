import { Todo } from '../type/Todo';

type CurrentTodoAction = {
  type: 'todo/selected',
  payload: Todo,
};

type RemoveCurrentTodoAction = {
  type: 'todo/remove',
};

type TodoActions = CurrentTodoAction | RemoveCurrentTodoAction;

// eslint-disable-next-line max-len
export const currentTodoReducer = (currentTodo: Todo | null = null, action: TodoActions) => {
  switch (action.type) {
    case 'todo/selected':

      return action.payload;

    case 'todo/remove':
      return null;

    default:
      return currentTodo;
  }
};

export const actions = {
  setCurrentTodo: (currentTodo: Todo): CurrentTodoAction => ({
    type: 'todo/selected',
    payload: currentTodo,
  }),

  removeCurrentTodo: (): RemoveCurrentTodoAction => ({
    type: 'todo/remove',
  }),
};
