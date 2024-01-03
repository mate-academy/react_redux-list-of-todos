export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type SetQueryAction = { type: 'filter', payload: string };
type SetStatusAction = { type: 'sort', payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'sort',
  payload: status,
});

type Action = SetQueryAction | SetStatusAction;

type State = {
  query: string,
  status: Status,
};

const startValue = {
  query: '',
  status: Status.All,
};

export const actions = { setQuery, setStatus };

const filterReducer = (
  state: State = startValue,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter':
      return { ...state, query: action.payload };

    case 'sort':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
