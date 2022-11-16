import { GroupBy } from '../types/GroupBy';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetGroupByAction = {
  type: 'filter/SET_GROUPBY';
  payload: GroupBy;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setGroupBy = (groupBy: GroupBy): SetGroupByAction => ({
  type: 'filter/SET_GROUPBY',
  payload: groupBy,
});

export const actions = { setQuery, setGroupBy };

type State = { query: string, groupBy: GroupBy };
type Action = SetQueryAction | SetGroupByAction;

const initialState = {
  query: '',
  groupBy: GroupBy.All,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_GROUPBY':
      return { ...state, groupBy: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
