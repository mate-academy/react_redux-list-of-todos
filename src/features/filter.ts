type QUERY = { type: 'filter/SET_QUERY', payload: string };
type ALL = { type: 'filter/ALL', payload: string };
type ACTIVE = { type: 'filter/ACTIVE', payload: string };
type COMPLETED = { type: 'filter/COMPLETED', payload: string };

type ACTION = ALL | ACTIVE | COMPLETED | QUERY;

const query = (value: string) => ({ type: 'filter/SET_QUERY', payload: value });
const all = (value: string) => ({ type: 'filter/ALL', payload: value });
const active = (value: string) => ({ type: 'filter/ACTIVE', payload: value });
// eslint-disable-next-line max-len
const completed = (value: string) => ({ type: 'filter/COMPLETED', payload: value });

const status = {
  all,
  active,
  completed,
};

export const actions = {
  query, status,
};

export type State = {
  query: string,
  status: string,
};

const initialState: State = {
  query: '',
  status: 'filter/ALL',
};

const filterReducer = (state: State = initialState, action: ACTION) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/ACTIVE':
      return { ...state, status: action.payload };
    case 'filter/COMPLETED':
      return { ...state, status: action.payload };
    case 'filter/ALL':
    default:
      return state;
  }
};

export default filterReducer;
