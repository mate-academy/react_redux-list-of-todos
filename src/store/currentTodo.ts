import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todo/set',
  payload: Todo,
};

type DeleteTodoAction = {
  type: 'todo/delete',
};

export type TodoAction = SetTodoAction | DeleteTodoAction;

const initialState = null;

export const todoReducer = (todo = initialState, action: TodoAction) => {
  switch (action.type) {
    case 'todo/set':
      return action.payload;

    case 'todo/delete':
      return null;

    default:
      return todo;
  }
};

export const actions = {
  setTodo: ((todo: Todo): SetTodoAction => ({
    type: 'todo/set',
    payload: todo,
  })),
  deleteTodo: (): DeleteTodoAction => ({ type: 'todo/delete' }),
};
