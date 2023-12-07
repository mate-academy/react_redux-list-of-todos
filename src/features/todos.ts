import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'TODOS/SET_TODOS', payload: Todo[] };

export const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'TODOS/SET_TODOS',
  payload: value,
});

type Action = SetTodosAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'TODOS/SET_TODOS':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { setTodos };

export default todosReducer;
