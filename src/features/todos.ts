import { Todo } from '../types/Todo';

type GetDataAction = { type: 'todos/GET', payload: Todo[] };

const getData = (data: Todo[]): GetDataAction => ({
  type: 'todos/GET',
  payload: data,
});

export const actions = { getData };

type Action = GetDataAction;

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
