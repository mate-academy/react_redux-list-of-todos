import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todo/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todo/SET',
  payload: todos,
});

type Action = SetTodosAction;

export const actions = { setTodos };

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET': {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default todosReducer;
