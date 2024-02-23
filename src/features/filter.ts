import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type SetStatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};

const SetQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const SetStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { SetQuery, SetStatus };

type State = {
  query: string,
  status: Status,
};

type Action = SetQueryAction | SetStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };

    case 'filter/QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
