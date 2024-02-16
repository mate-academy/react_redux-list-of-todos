import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todo/SET_TODOS',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todo/SET_TODOS',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (state: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todo/SET_TODOS':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
