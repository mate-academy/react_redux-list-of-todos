type QUERY = { type: 'filter/SET_QUERY', payload: string };
// type ALL = { type: 'filter/ALL', payload: string };
// type ACTIVE = { type: 'filter/ACTIVE', payload: string };
// type COMPLETED = { type: 'filter/COMPLETED', payload: string };
type STATUS = { type: 'filter/STATUS', payload: string };
type ACTION = STATUS | QUERY;

export enum Status {
  ALL = 'filter/ALL',
  ACTIVE = 'filter/ACTIVE',
  COMPLETED = 'filter/COMPLETED',
}

const query = (value: string) => ({ type: 'filter/SET_QUERY', payload: value });
// const all = (value: string) => ({ type: 'filter/ALL', payload: value });
// const active = (value: string) => ({ type: 'filter/ACTIVE', payload: value });
// eslint-disable-next-line max-len
// const completed = (value: string) => ({ type: 'filter/COMPLETED', payload: value });
// eslint-disable-next-line max-len
const setStatus = (value: string) => ({ type: 'filter/SET_STATUS', payload: value });

const status = {
  setStatus,
};

export const actions = {
  query, status,
};

export type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (state: State = initialState, action: ACTION) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
