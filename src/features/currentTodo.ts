import { Todo } from '../types/Todo';

type State = Todo | null;

type SetCurrentTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

type RemoveCurrentTodoAction = {
  type: 'currentTodo/REMOVE';
};

type Action = SetCurrentTodoAction | RemoveCurrentTodoAction;

const setCurrentTodo = (todo: Todo): SetCurrentTodoAction => {
  return {
    type: 'currentTodo/SET',
    payload: todo,
  };
};

const removeCurrentTodo = (): RemoveCurrentTodoAction => {
  return {
    type: 'currentTodo/REMOVE',
  };
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const currentTodoReducer = (state: State = null, action: Action) => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;
    case 'currentTodo/REMOVE':
      return null;
    default:
      return state;
  }
};

export const actions = { setCurrentTodo, removeCurrentTodo };
