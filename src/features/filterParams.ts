import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SetQuery', payload: string };
type SetStatusAction = { type: 'filter/SetStatus', payload: Status };

const setQuery = (query: string): SetQueryAction => (
  {
    type: 'filter/SetQuery',
    payload: query,
  }
);

const setStatus = (value: Status): SetStatusAction => (
  { type: 'filter/SetStatus', payload: value }
);

export const actions = { setQuery, setStatus };

type Action = SetQueryAction | SetStatusAction;

type FilterParams = {
  query: string;
  status: Status;
};

const initialFilterParams: FilterParams = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: FilterParams = initialFilterParams,
  action: Action,
): FilterParams => {
  switch (action.type) {
    case 'filter/SetQuery':
      return {
        ...state, query: action.payload,
      };

    case 'filter/SetStatus':
      return {
        ...state, status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
