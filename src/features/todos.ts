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

const todosReducer = (
  state = initialTodos,
  action: SetAddAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET_ADD':
      return [...action.payload, ...state];

    default:
      return state;
  }
};

export default todosReducer;
