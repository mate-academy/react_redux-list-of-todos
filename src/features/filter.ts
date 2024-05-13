import { Status } from '../types/Status';

export enum FilterActionTypes {
  change = 'filters/CHANGE',
  querry = 'filters/QUERY',
}

type ChangeFiltersAction = { type: FilterActionTypes.change; payload: Status };

type QueryFilterAction = { type: FilterActionTypes.querry; payload: string };

const changeFilters = (status: Status): ChangeFiltersAction => ({
  type: FilterActionTypes.change,
  payload: status,
});

const queryFilter = (query: string): QueryFilterAction => ({
  type: FilterActionTypes.querry,
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
    case FilterActionTypes.change: {
      return {
        ...state,
        status: action.payload,
      };
    }

    case FilterActionTypes.querry: {
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
