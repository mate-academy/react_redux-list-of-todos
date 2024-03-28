import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

type SetFilter = {
  type: 'filter/SET_FILTER';
  payload: Filter;
};

const setFilter = (filter: Filter): SetFilter => ({
  type: 'filter/SET_FILTER',
  payload: filter,
});

const initialState: Filter = { query: '', status: 'all' };

export const actions = {
  setFilter,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: SetFilter) => {
  switch (action.type) {
    case 'filter/SET_FILTER':
      return action.payload;

    default:
      return state;
  }
};

export default filterReducer;
