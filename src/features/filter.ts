import { FilterStatus } from '../types/FilterStatus';

type AllActions = { type: 'ALL', payload: string };
type ActiveActions = { type: 'ACTIVE', payload: string };
type CompletedActions = { type: 'COMPLETED', payload: string };
type InputActions = { type: 'INPUT', payload: string };

type Action = AllActions | ActiveActions | CompletedActions | InputActions;

const all = (query: string): Action => ({ type: 'ALL', payload: query });
const active = (query: string): Action => ({ type: 'ACTIVE', payload: query });
const completed = (query: string): Action => (
  { type: 'COMPLETED', payload: query });
const input = (query: string): Action => ({ type: 'INPUT', payload: query });

export const actions = {
  all, active, completed, input,
};

const initialState = { query: '', status: FilterStatus.All };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ALL':
      return {
        query: action.payload,
        status: FilterStatus.All,
      };
    case 'ACTIVE':
      return {
        query: action.payload,
        status: FilterStatus.Active,
      };
    case 'COMPLETED':
      return {
        query: action.payload,
        status: FilterStatus.Completed,
      };
    case 'INPUT':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
