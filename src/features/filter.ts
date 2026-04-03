export type FilterStatus = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: FilterStatus;
}

const SET_QUERY = 'filter/SET_QUERY' as const;
const SET_STATUS = 'filter/SET_STATUS' as const;
const RESET_FILTER = 'filter/RESET_FILTER' as const;

interface SetQueryAction {
  type: typeof SET_QUERY;
  payload: string;
}
interface SetStatusAction {
  type: typeof SET_STATUS;
  payload: FilterStatus;
}
interface ResetFilterAction {
  type: typeof RESET_FILTER;
}

type FilterAction = SetQueryAction | SetStatusAction | ResetFilterAction;

const setQuery = (query: string): SetQueryAction => ({
  type: SET_QUERY,
  payload: query,
});
const setStatus = (status: FilterStatus): SetStatusAction => ({
  type: SET_STATUS,
  payload: status,
});
const resetFilter = (): ResetFilterAction => ({ type: RESET_FILTER });

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: FilterState = initialState,
  action: FilterAction,
): FilterState => {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: action.payload };

    case SET_STATUS:
      return { ...state, status: action.payload };

    case RESET_FILTER:
      return initialState;

    default:
      return state;
  }
};

export { setQuery, setStatus, resetFilter };

export default filterReducer;

/*import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
});*/
