import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const set = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { set };

// eslint-disable-next-line
const todosReducer = (todos: Todo[] = [], action: SetTodosAction) => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
