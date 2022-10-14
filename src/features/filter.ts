import { Status } from '../types/Status';
// export const actions = { /* put action creators here */};

type QueryAction = {
  type: 'filter/Query';
  payload: string;
};

type FilterAction = {
  type: 'filter/Filter'
  playload: Status
};

type Actions = QueryAction | FilterAction;

const setQuery = (query: string): QueryAction => (
  {
    type: 'filter/Query',
    payload: query,
  }
);

const setFilter = (status: Status): FilterAction => ({
  type: 'filter/Filter',
  playload: status,
});

export const actions = { setQuery, setFilter };

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case 'filter/Query':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/Filter':
      return {
        ...state,
        status: action.playload,
      };

    default:
      return state;
  }
};

export default filterReducer;
