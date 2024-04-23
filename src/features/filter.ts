/* eslint-disable @typescript-eslint/default-param-last */
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

export interface State {
  query: string;
  status: Status;
}

const status = (option: Status): FilterStatus => ({
  type: 'filter/status',
  payload: option,
});

const search = (querty: string): Search => ({
  type: 'filter/search',
  payload: querty,
});

export const actions = { status, search };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/status':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/search':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
