import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'currentTodos/SET', payload: Todo[] };

export const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'currentTodos/SET',
  payload: todos,
});

type Action = SetTodosAction;

const todosReducer = (todos = [], action: Action): Todo[] => {
  switch (action.type) {
    case ('currentTodos/SET'):
      return action.payload;
    default:
      return todos;
  }
};

export const actions = { setTodos };

export default todosReducer;
