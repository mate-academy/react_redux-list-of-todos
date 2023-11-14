import { Status } from '../types/Status';

type AddQuery = {
  type: 'Add/Query';
  payload: string;
};

type AddStatus = {
  type: 'Add/Status';
  payload: string;
};

type Action = AddQuery | AddStatus;

const addQuery = (query: string): Action => ({
  type: 'Add/Query',
  payload: query,
});
const addStatus = (status: Status): Action => ({
  type: 'Add/Status',
  payload: status,
});

export const actions = { addQuery, addStatus };

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'Add/Query':
      return {
        ...state,
        query: action.payload,
      };
    case 'Add/Status':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return {
        query: '',
        status: 'all',
      };
  }
};

export default filterReducer;
