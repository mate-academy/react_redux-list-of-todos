export enum Status {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

export const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

export const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

type DeleteQueryAction = {
  type: 'filter/DELETE_QUERY';
};

export const deleteQuery = (): DeleteQueryAction => ({
  type: 'filter/DELETE_QUERY',
});

type State = {
  query: string;
  status: Status;
};

type Action = SetStatusAction | SetQueryAction | DeleteQueryAction;

const filterReducer = (
  state: State = {
    query: '',
    status: Status.ALL,
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/DELETE_QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
