import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SETQUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SETSTATUS';
  payload: Status;
};

type InitialState = {
  query: string;
  status: Status;
};
const initialState: InitialState = {
  query: '',
  status: 'All',
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

type Action = SetQueryAction | SetStatusAction;

export const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: InitialState = initialState,
  action: Action,
): InitialState => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return { ...state, query: action.payload };
    case 'filter/SETSTATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };
