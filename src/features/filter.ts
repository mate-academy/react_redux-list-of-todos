import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SETQUERY',
  payload: string,
};
type SetStatusAction = {
  type: 'filter/SETSTATUS',
  payload: Status,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

type State = {
  status: Status,
  query: string,
};
type Action = SetQueryAction | SetStatusAction;

const initialState = {
  status: 'all' as Status,
  query: '',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/SETSTATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };
export default filterReducer;
