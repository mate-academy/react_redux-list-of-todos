import { Status } from '../types/Status';

type Filter = {
  status: Status;
  query: string;
};

const initialState: Filter = {
  status: 'all',
  query: '',
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type Action = SetStatusAction | SetQueryAction;

const setStatus = (value: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

export const actions = { setStatus, setQuery };

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (filter = initialState, action: Action): Filter => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...filter,
        status: action.payload,
      };
    case 'filter/SET_QUERY':
      return {
        ...filter,
        query: action.payload,
      };

    default:
      return filter;
  }
};

export default filterReducer;
