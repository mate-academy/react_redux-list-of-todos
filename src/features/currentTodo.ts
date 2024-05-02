import { Todo } from '../types/Todo';

type State = Todo | null;

type SetAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

type RemoveAction = {
  type: 'currentTodo/REMOVE';
};

type Action = SetAction | RemoveAction;

const setTodo = (todo: Todo): SetAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const removeTodo = (): RemoveAction => ({
  type: 'currentTodo/REMOVE',
});

export const actions = { setTodo, removeTodo };

export const currentTodoReducer = (
  todo: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return {
        ...action.payload,
      };

    case 'currentTodo/REMOVE':
      return null;

    default:
      return todo;
  }
};
