type QUERY = { type: 'filter/SET_QUERY', payload: string };
type ALL = { type: 'filter/ALL' };
type ACTIVE = { type: 'filter/ACTIVE' };
type COMPLETED = { type: 'filter/COMPLETED' };

type ACTION = ALL | ACTIVE | COMPLETED | QUERY;

const query = (value: string) => ({ type: 'filter/SET_QUERY', payload: value });
const all = () => ({ type: 'filter/ALL' });
const active = () => ({ type: 'filter/ACTIVE' });
const completed = () => ({ type: 'filter/COMPLETED' });

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
  status: 'filter/ALL' | 'filter/ACTIVE' | 'filter/COMPLETED',
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
      return { ...state, status: action.type };

    case 'filter/COMPLETED':
      return { ...state, status: action.type };

    case 'filter/ALL':
    default:
      return state;
  }
};

export default filterReducer;
