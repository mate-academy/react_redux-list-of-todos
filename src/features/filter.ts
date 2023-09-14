import { Status } from '../types/Status';

interface SetQueryAction {
  type: 'SET_QUERY';
  payload: string;
}

interface SetSelectedStatusAction {
  type: 'SET_SELECTED_STATUS';
  payload: Status;
}

export type FilterAction = SetQueryAction | SetSelectedStatusAction;

export const setQuery = (query: string): SetQueryAction => ({
  type: 'SET_QUERY',
  payload: query,
});

export const setSelectedStatus = (status: Status): SetSelectedStatusAction => ({
  type: 'SET_SELECTED_STATUS',
  payload: status,
});

interface FilterState {
  query: string,
  selectedStatus: Status,
}

const initialFilterState: FilterState = {
  query: '',
  selectedStatus: 'all',
};

const filterReducer = (state = initialFilterState, action: FilterAction) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'SET_SELECTED_STATUS':
      return {
        ...state,
        selectedStatus: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
