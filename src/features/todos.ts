import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const set = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
