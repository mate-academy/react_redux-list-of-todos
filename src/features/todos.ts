import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET'; payload: Todo[] };
const set = (todosValue: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todosValue,
});

export const actions = { set };

type Action = SetTodosAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
