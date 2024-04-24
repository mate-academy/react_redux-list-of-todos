export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

// Actions type
type SetStatusAction = {
  type: 'filter/SET';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

// dispatch Functions
const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/SET',
  payload: status,
});

const setQueryAction = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = {
  setStatus,
  setQueryAction,
};

// Type for initial State
type State = {
  query: string;
  status: string;
};

type Action = SetStatusAction | SetQueryAction;

const initialState: State = {
  query: '',
  status: Status.All,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET':
      return {
        ...state,
        status: action.payload,
      };
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
