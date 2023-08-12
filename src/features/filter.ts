// import { Todo } from '../types/Todo';

import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET',
  payload: string,
};

type ClearQueryAction = {
  type: 'query/CLEAR',
};

type SetStatusAction = {
  type: 'status/SET',
  payload: Status,
};

type Action = SetQueryAction
| SetStatusAction
| ClearQueryAction;

const setQueryFilter = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const clearQueryFilter = (): ClearQueryAction => ({
  type: 'query/CLEAR',
});

const setStatusFilter = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'status/SET':
      return { ...state, status: action.payload };

    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/CLEAR':
      return { ...state, query: '' };

    default: return state;
  }
};

export const actions = { setQueryFilter, setStatusFilter, clearQueryFilter };

export default filterReducer;
