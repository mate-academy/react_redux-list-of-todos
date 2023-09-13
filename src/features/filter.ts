import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type FilterActiveAction = { type: 'filter/ACTIVE' };

type FilterComletedAction = { type: 'filter/COMPLETED' };

type FilterAllAction = { type: 'filter/ALL' };

type Action = QueryAction
| FilterActiveAction
| FilterComletedAction
| FilterAllAction;

const filterQuery = (text: string): QueryAction => (
  { type: 'filter/QUERY', payload: text }
);
const filterActive = (): FilterActiveAction => (
  { type: 'filter/ACTIVE' }
);
const filterCompleted = (): FilterComletedAction => (
  { type: 'filter/COMPLETED' }
);
const filterAll = (): FilterAllAction => (
  { type: 'filter/ALL' }
);

export const actions = {
  filterActive,
  filterCompleted,
  filterAll,
  filterQuery,
};

type State = {
  query: string,
  status: Status,
};

const startValue: State = {
  query: '',
  status: Status.all,
};

const filterReducer = (
  value = startValue,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...value,
        query: action.payload,
      };

    case 'filter/ACTIVE':
      return {
        ...value,
        status: Status.active,
      };

    case 'filter/COMPLETED':
      return {
        ...value,
        status: Status.completed,
      };

    case 'filter/ALL':
      return {
        ...value,
        status: Status.all,
      };

    default:
      return {
        query: '',
        status: Status.all,
      };
  }
};

export default filterReducer;
