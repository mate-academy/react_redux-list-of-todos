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

const queryChange = (value: string): QueryChange => ({
  type: 'filter/queryChange',
  payload: value,
});

const statusChange = (value: Status): StatusChange => ({
  type: 'filter/selectChange',
  payload: value,
});

const initialData = {
  query: '',
  status: 'all',
};

export const actions = { queryChange, statusChange };

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

export default filterReducer;
