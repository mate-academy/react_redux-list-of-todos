import { Todo } from '../types/Todo';

type SetAction = { type: 'todo/SET', payload: Todo[] };

type Action = SetAction;

const set = (newTodos: Todo[]): SetAction => ({
  type: 'todo/SET',
  payload: newTodos,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
export const actions = { set };
