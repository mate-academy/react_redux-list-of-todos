import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

type Actions = SetTodosAction;

const set = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { set };

const todosReducer = (state: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
