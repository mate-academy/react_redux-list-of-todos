import { SortingStatus } from '../types/SortingStatus';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: SortingStatus;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: SortingStatus): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: SortingStatus,
};
type Action = SetQueryAction | SetStatusAction;

const filterReducer = (
  state: State = {
    query: '',
    status: SortingStatus.All,
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        query: action.payload,
        status: state.status,
      };
    case 'filter/SET_STATUS':
      return {
        query: state.query,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
