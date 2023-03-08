import { Todo } from '../types/Todo';

type FetchDataAction = {
  type: 'Todos/FETCH_DATA',
  payload: Todo[],
};

const fetchData = (data: Todo[]): FetchDataAction => ({
  type: 'Todos/FETCH_DATA',
  payload: data,
});

export const actions = { fetchData };

const todosReducer = (
  state: Todo[] = [],
  action: FetchDataAction,
): Todo[] => {
  switch (action.type) {
    case 'Todos/FETCH_DATA':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
