import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'loadTodos/SET', payload: Todo[] };

const set = (todos: Todo[]): SetTodosAction => ({
  type: 'loadTodos/SET',
  payload: todos,
});

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: SetTodosAction): Todo[] => {
  if (action.type === 'loadTodos/SET') {
    return [...todos, ...action.payload];
  }

  return todos;
};

export default todosReducer;
