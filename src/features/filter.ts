// import { useDispatch } from 'react-redux';
import { Status } from './todos';

export const actions = { /* put action creators here */
  query: (query: string): Action => (
    {
      type: 'query/SET',
      payload: query,
    }),
  status: (value: Status): Action => ({
    type: 'status/SET',
    payload: value,
  }),
};

type Filter = {
  query: string,
  status: Status,
};

const initialState: Filter = {
  query: '',
  status: 'todos/ALL',
};

type Action = {
  type: 'query/SET' | 'status/SET';
  payload: string | Status
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload as string };
    case 'status/SET':
      return { ...state, status: action.payload as Status };
    default:
      return state;
  }
};

export default filterReducer;
