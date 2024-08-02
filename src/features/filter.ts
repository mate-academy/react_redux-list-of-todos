import { SelectedStatus } from '../types/SelectedStatus';

type SetTQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: SelectedStatus;
};

type Action = SetTQueryAction | SetStatusAction;

type State = {
  query: string;
  status: SelectedStatus;
};

const setQuery = (query: string): SetTQueryAction => {
  return {
    type: 'filter/QUERY',
    payload: query,
  };
};

const setStatus = (status: SelectedStatus): SetStatusAction => {
  return {
    type: 'filter/STATUS',
    payload: status,
  };
};

const initialState: State = {
  query: '',
  status: SelectedStatus.all,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };
