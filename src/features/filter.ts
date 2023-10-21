type SetQueryAction = { type: 'query/SET', payload: string };
type ClearQueryAction = { type: 'query/CLEAR' };
type SetStatusAction = { type: 'status/SET', payload: string };

type Actions = SetQueryAction | ClearQueryAction | SetStatusAction;

type State = {
  query: string;
  status: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'query/CLEAR',
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, setStatus, clearQuery };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case 'query/SET':
      return {
        query: action.payload,
        status: state.status,
      };
    case 'query/CLEAR':
      return {
        query: '',
        status: state.status,
      };
    case 'status/SET':
      return {
        query: state.query,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
