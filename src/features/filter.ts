import { FilterStatus } from '../types/FilterStatus';

enum ActionType {
  ALL = 'All',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  INPUT = 'INPUT',
}

type Action = { type: ActionType, payload: string };

const all = (query: string): Action => (
  { type: ActionType.ALL, payload: query }
);
const active = (query: string): Action => (
  { type: ActionType.ACTIVE, payload: query }
);
const completed = (query: string): Action => (
  { type: ActionType.COMPLETED, payload: query });
const input = (query: string): Action => (
  { type: ActionType.INPUT, payload: query }
);

export const actions = {
  all, active, completed, input,
};

const initialState = { query: '', status: FilterStatus.All };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ALL:
      return {
        query: action.payload,
        status: FilterStatus.All,
      };
    case ActionType.ACTIVE:
      return {
        query: action.payload,
        status: FilterStatus.Active,
      };
    case ActionType.COMPLETED:
      return {
        query: action.payload,
        status: FilterStatus.Completed,
      };
    case ActionType.INPUT:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
