import { Status } from '../types/Status';

type QueryChange = {
  type: 'filter/queryChange';
  payload: string;
};

type SelectChange = {
  type: 'filter/selectChange';
  payload: Status;
};

type Action = QueryChange | SelectChange;

const initialData = {
  query: '',
  status: 'all',
};

const queryChange = (payload: string) => ({
  type: 'filter/queryChange',
  payload,
});

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialData, action: Action) => {
  switch (action.type) {
    case 'filter/queryChange':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export const actions = {
  queryChange,
};

export default filterReducer;
