import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type Action = {
  type: string;
  payload: Todo;
};

type DefaultValue = {
  CurTodo: Todo | null;
};

const AddTodo = 'currentTodo/SET';
const RemoveTodo = 'currentTodo/REMOVE';

const defaultValue: DefaultValue = {
  CurTodo: null,
};
/* eslint-disable */
const currentTodoReducer = (
  state: DefaultValue = defaultValue,
  action: Action,
): DefaultValue => {
  switch (action.type) {
    case AddTodo:
      return { ...state, CurTodo: action.payload };
    case RemoveTodo:
      return { ...state, CurTodo: null };
    default:
      return state;
  }
};
/* eslint-enable */

export default currentTodoReducer;
