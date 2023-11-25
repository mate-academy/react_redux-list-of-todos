import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todosAction/SET', payload: Todo[] };
type RemoveTodosAction = { type: 'todosAction/REMOVE' };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todosAction/SET',
  payload: todos,
});

const removeTodos = (): RemoveTodosAction => ({
  type: 'todosAction/REMOVE',
});

export const actions = { setTodos, removeTodos };

type Action = SetTodosAction | RemoveTodosAction;

export const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todosAction/SET': {
      return action.payload;
    }

    case 'todosAction/REMOVE': {
      return [];
    }

    default: {
      return state;
    }
  }
};
