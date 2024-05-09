import { Status } from '../types/Status';

type ChangeFiltersAction = { type: 'filters/CHANGE'; payload: Status };

type QueryFilterAction = { type: 'filters/QUERY'; payload: string };

const changeFilters = (status: Status): ChangeFiltersAction => ({
  type: 'filters/CHANGE',
  payload: status,
});

const queryFilter = (query: string): QueryFilterAction => ({
  type: 'filters/QUERY',
  payload: query,
});

export const actions = {
  changeFilters,
  queryFilter,
};

type State = {
  query: string | '';
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = ChangeFiltersAction | QueryFilterAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filters/CHANGE': {
      return {
        ...state,
        status: action.payload,
      };
    }

    case 'filters/QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default filterReducer;
