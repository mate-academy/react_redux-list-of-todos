import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type StatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

type Action = QueryAction | StatusAction;

const query = (payload: string): QueryAction => ({
  type: 'filter/QUERY',
  payload,
});

const status = (value: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

export const actions = { query, status };

const filterReducer = (filter: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...filter, query: action.payload };
    case 'filter/STATUS':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
