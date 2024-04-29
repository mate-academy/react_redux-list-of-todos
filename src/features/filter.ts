import { Status } from '../types/Status';

type QueryChange = {
  type: 'filter/queryChange';
  payload: string;
};

type StatusChange = {
  type: 'filter/selectChange';
  payload: Status;
};

type Action = QueryChange | StatusChange;

const initialData = {
  query: '',
  status: 'all',
};

const queryChange = (payload: string) => ({
  type: 'filter/queryChange',
  payload,
});
const statusChange = (payload: Status) => ({
  type: 'filter/selectChange',
  payload,
});

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialData, action: Action) => {
  switch (action.type) {
    case 'filter/queryChange':
      return { ...state, query: action.payload };
    case 'filter/selectChange':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const actions = {
  queryChange,
  statusChange,
};

export default filterReducer;
