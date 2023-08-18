type Set = {
  type: 'setQuery',
  payload: string,
};

type Clear = {
  type: 'clearQuery',
};

type Status = {
  type: 'setStatus',
  payload: string,
};

const setQuery = (newQuery: string): Set => ({
  type: 'setQuery',
  payload: newQuery,
});

const clearQuery = (): Clear => ({ type: 'clearQuery' });
const setStatus = (newStatus: string): Status => ({
  type: 'setStatus',
  payload: newStatus,
});

type Action = Set
| Clear
| Status;

export const actions = { setQuery, clearQuery, setStatus };

type State = {
  query: string,
  status: string,
};

const filterReducer = (
  amount: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'setQuery':
      return {
        ...amount,
        query: action.payload,
      };

    case 'clearQuery':
      return {
        ...amount,
        query: '',
      };

    case 'setStatus':
      return {
        ...amount,
        status: action.payload,
      };

    default: return amount;
  }
};

export default filterReducer;
