type SetQuery = { type: 'filter/SetQuery'; payload: string };
type SetStatus = { type: 'filter/SetStatus'; payload: string };

const setStatus = (value: string): SetStatus => ({
  type: 'filter/SetStatus',
  payload: value,
});

const setQuery = (value: string): SetQuery => ({
  type: 'filter/SetQuery',
  payload: value,
});

export type State = {
  query: string;
  status: string;
};

type Action = SetStatus | SetQuery;

const initialState: State = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SetStatus':
      return { query: state.query, status: action.payload };
    case 'filter/SetQuery':
      return { query: action.payload, status: state.status };
    default:
      return state;
  }
};

export const actions = {
  setQuery,
  setStatus,
};

export default filterReducer;
