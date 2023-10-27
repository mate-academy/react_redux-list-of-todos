import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ToggleStatusAction = {
  type: 'filter/TOGGLE_STATUS';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const toggleStatus = (status: Status): ToggleStatusAction => ({
  type: 'filter/TOGGLE_STATUS',
  payload: status,
});

export const actions = { setQuery, toggleStatus };

type State = {
  query: string;
  status: Status;
};

type Action = SetQueryAction | ToggleStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/TOGGLE_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
