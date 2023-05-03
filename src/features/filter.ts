import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET-QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET-STATUS';
  payload: Status };

const setQuery = (text: string): SetQueryAction => ({
  type: 'filter/SET-QUERY',
  payload: text,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET-STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type FilterState = {
  query: string;
  status: Status;
};

type Action = SetQueryAction | SetStatusAction;

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: FilterState = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET-QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET-STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
