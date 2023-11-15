import { Status } from '../types/Status';

type ChangeStatusAction = {
  type: 'filter/Set',
  payload: Status,
};

type ChangeQueryAction = {
  type: 'query/Set' | 'query/Clear',
  payload: string;
};

type State = {
  query: string,
  status: Status,
};

const setStatus = (status: Status): ChangeStatusAction => ({
  type: 'filter/Set',
  payload: status,
});

const setQuery = (query: string): ChangeQueryAction => ({
  type: 'query/Set',
  payload: query,
});

const clearQuery = (): ChangeQueryAction => ({
  type: 'query/Clear',
  payload: '',
});

const InitialState: State = {
  query: '',
  status: 'all',
};

type Actions = ChangeQueryAction | ChangeStatusAction;

export const actions = { setStatus, setQuery, clearQuery };

const filterReducer = (
  state: State = InitialState,
  action: Actions,
) => {
  switch (action.type) {
    case ('filter/Set'):
      return { ...state, status: action.payload };

    case ('query/Set'):
      return { ...state, query: action.payload };

    case ('query/Clear'):
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
