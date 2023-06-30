import { Status } from '../types/Status';

type StatusAction = { type: 'filter/CHANGE_STATUS', payload: Status };
type QueryAction = { type: 'filter/CHANGE_QUERY', payload: string };
type ClearAction = { type: 'filter/CLEAR_QUERY' };

type Actions = StatusAction | QueryAction | ClearAction;

const changeStatus = (payload: Status): StatusAction => ({
  type: 'filter/CHANGE_STATUS', payload,
});

const changeQuery = (payload: string): QueryAction => ({
  type: 'filter/CHANGE_QUERY', payload,
});

const clear = (): ClearAction => ({ type: 'filter/CLEAR_QUERY' });

const initialState = {
  status: 'all',
  query: '',
};

const filterReducer = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case 'filter/CHANGE_STATUS':
      return {
        ...state,
        status: actions.payload,
      };
    case 'filter/CHANGE_QUERY':
      return {
        ...state,
        query: actions.payload,
      };
    case 'filter/CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export const actions = { clear, changeQuery, changeStatus };
export default filterReducer;
