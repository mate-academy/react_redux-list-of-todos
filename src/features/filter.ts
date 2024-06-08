export type Status = 'all' | 'active' | 'completed';

type FilterStatus = {
  type: 'filter/status';
  payload: Status;
};

type Search = {
  type: 'filter/search';
  payload: string;
};

type Action = FilterStatus | Search;

export type State = {
  query: string;
  status: string;
};

const status = (option: Status): FilterStatus => ({
  type: 'filter/status',
  payload: option,
});

const search = (query: string): Search => ({
  type: 'filter/search',
  payload: query,
});

export const actions = {
  status,
  search,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/status':
      return { ...state, status: action.payload };

    case 'filter/search':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
