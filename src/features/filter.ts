import { Status } from '../types/Status';

type SetOueryAction = {
  type: 'filter/queru';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/status';
  payload: Status;
};

type Action = SetOueryAction | SetStatusAction;

const setOuery = (query: string): SetOueryAction => ({
  type: 'filter/queru',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/status',
  payload: status,
});

const initialState = {
  query: '',
  status: Status.All,
};

export const reducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: Action,
): typeof initialState => {
  switch (action.type) {
    case 'filter/queru':
      return { ...state, query: action.payload };

    case 'filter/status':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const action = { setOuery, setStatus };
