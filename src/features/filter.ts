export enum Statuses {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: string,
};

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  state: State = {
    query: '',
    status: Statuses.All,
  },
  action: Action,
) : State => {
  switch ((action.type)) {
    case 'filter/SET_QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }

    case 'filter/SET_STATUS': {
      return <State>{
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
