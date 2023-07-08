import { Todo } from '../types/Todo';

type SetAddAction = {
  type: 'todos/SET_ADD',
  playload: Todo[],
};

const SetAdd = (arr: Todo[]): SetAddAction => ({
  type: 'todos/SET_ADD',
  playload: arr,
});

export const actions = { SetAdd };

const initialTodos: Todo[] = [];

type Action = SetAddAction;

const todosReducer = (
  state = initialTodos,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET_ADD':
      return [...action.playload, ...state];

    default:
      return [...state];
  }
};

export default todosReducer;
