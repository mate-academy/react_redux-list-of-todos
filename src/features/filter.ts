import { TodoFilterStatus } from '../types/Enum';

type FilterState = {
  status: TodoFilterStatus;
  query: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: FilterState['status'];
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: FilterState['query'];
};

type ResetQueryAction = {
  type: 'filter/REMOVE_QUERY';
  payload: string;
};

const initialState: FilterState = {
  status: TodoFilterStatus.ALL,
  query: '',
};

type FilterActions = SetStatusAction | SetQueryAction | ResetQueryAction;

const setQuery = (payload: SetQueryAction['payload']): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload,
});

const setStatus = (payload: SetStatusAction['payload']): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload,
});

const clearQuery = (): ResetQueryAction => ({
  type: 'filter/REMOVE_QUERY',
  payload: '',
});

export const actions = {
  setStatus,
  setQuery,
  clearQuery,
};

const filterReducer = (
  state: FilterState = initialState,
  { type, payload }: FilterActions,
): FilterState => {
  switch (type) {
    case 'filter/SET_STATUS':
      return { ...state, status: payload };
    case 'filter/SET_QUERY':
      return { ...state, query: payload };
    case 'filter/REMOVE_QUERY':
      return { ...state, query: payload };
    default:
      return state;
  }
};

export default filterReducer;
