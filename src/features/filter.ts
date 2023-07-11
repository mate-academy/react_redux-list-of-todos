import { Filter } from '../types/Filter';
import { SORT } from '../types/Sort';

type QueryAddAction = { type: 'filter/QUERYADD', payload: string };
type QueryClearAction = { type: 'filter/QUERYCLEAR' };
type SortChangeAction = { type: 'filter/SORTCHANGE', payload: SORT };

type Action = QueryAddAction | QueryClearAction | SortChangeAction;

const queryAdd = (value: string): QueryAddAction => ({
  type: 'filter/QUERYADD',
  payload: value,
});

const queryClear = (): QueryClearAction => ({
  type: 'filter/QUERYCLEAR',
});

const sortChange = (value: string) => ({
  type: 'filter/SORTCHANGE',
  payload: value,
});

export const actions = { queryAdd, queryClear, sortChange };

const filterReducer = (filter: Filter = {
  query: '',
  sort: SORT.All,
},
action: Action) => {
  switch (action.type) {
    case 'filter/QUERYADD':
      return { ...filter, query: action.payload };

    case 'filter/QUERYCLEAR':
      return { ...filter, query: '' };

    case 'filter/SORTCHANGE':
      return { ...filter, sort: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
