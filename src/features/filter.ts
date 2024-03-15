import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

type SetFilter = {
  type: 'filter/SET';
  payload: Filter;
};

const setFilter = (filter: Filter): SetFilter => ({
  type: 'filter/SET',
  payload: filter,
});

export const actions = {
  setFilter,
};

type State = Filter;
type Action = SetFilter;

const initialState: Filter = {
  query: '',
  status: Status.All,
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SET':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export default filterReducer;
