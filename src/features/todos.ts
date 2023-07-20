import { Todo } from '../types/Todo';

type SetAddAction = {
  type: 'todos/SET_ADD',
  payload: Todo[],
};

const SetAdd = (arr: Todo[]): SetAddAction => ({
  type: 'todos/SET_ADD',
  payload: arr,
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
      return [...state, ...action.payload];

    default:
      return [...state];
  }
};

export default todosReducer;
