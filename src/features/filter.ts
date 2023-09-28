import { Select } from '../types/Select';

type RemoveQueryAction = { type: 'filter/REMOVE' };

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Select;
};

const removeQuery = (): RemoveQueryAction => ({ type: 'filter/REMOVE' });

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Select): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type State = {
  query: string,
  status: Select,
};

type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

const filterReducer = (
  state: State = {
    query: '',
    status: Select.All,
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/REMOVE':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
