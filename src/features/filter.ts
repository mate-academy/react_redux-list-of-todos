import { Status } from '../types/Status';

enum FilterActionTypes {
  SET_QUERY = 'filter/SET_QUERY',
  SET_STATUS = 'filter/SET_STATUS',
}

type SetQueryAction = {
  type: FilterActionTypes.SET_QUERY;
  payload: string;
};

type SetStatusAction = {
  type: FilterActionTypes.SET_STATUS;
  payload: Status;
};

type FilterAction = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: FilterActionTypes.SET_QUERY,
  payload: query,
});

const setStataus = (status: Status): SetStatusAction => ({
  type: FilterActionTypes.SET_STATUS,
  payload: status,
});

type FilterState = {
  query: string;
  status: Status;
};

const initialSatate: FilterState = {
  query: '',
  status: 'all',
};

export const actions = { setQuery, setStataus };

const filterReducer = (
  state = initialSatate,
  action: FilterAction,
):FilterState => {
  switch (action.type) {
    case FilterActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case FilterActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
