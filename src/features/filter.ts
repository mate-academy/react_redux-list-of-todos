import { Status } from '../types/Status';

export type Filter = { query: string; status: Status };

type SetFilter = { type: 'filter/SET'; payload: Filter };

const setFilter = (filter: Filter): SetFilter => ({
  type: 'filter/SET',
  payload: filter,
});

export const actions = { setFilter };

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterReducer = (
  state: Filter = initialState,
  action: SetFilter,
) => {
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
