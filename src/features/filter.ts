import { Status } from '../types/Status';

type RemoveQueryAction = {
  type: 'filter/removeQuery'
};

type SetQueryAction = {
  type: 'filter/setQuery'
  payload: string;
};

type SetStatusAction = {
  type: 'filter/status',
  payload: Status,
};

type State = {
  query: string,
  status: Status,
};

const removeQvery = (): RemoveQueryAction => (
  { type: 'filter/removeQuery' }
);

const setQuery = (value: string): SetQueryAction => (
  {
    type: 'filter/setQuery',
    payload: value,
  }
);

const setStatus = (value: Status): SetStatusAction => (
  {
    type: 'filter/status',
    payload: value,
  }
);

type Action = RemoveQueryAction | SetQueryAction | SetStatusAction;

export const actions = { removeQvery, setQuery, setStatus };

const initionState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initionState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/removeQuery':
      return { ...state, query: '' };

    case 'filter/setQuery':
      return { ...state, query: action.payload };

    case 'filter/status':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
