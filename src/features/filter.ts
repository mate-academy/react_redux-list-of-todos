const ALL = 'ALL';
const ACTIVE = 'ACTIVE';
const COMPLETED = 'COMPLETED';
const INPUT = 'INPUT';

type AllAction = { type: typeof ALL, payload: string };
type ActiveAction = { type: typeof ACTIVE, payload: string };
type CompletedAction = { type: typeof COMPLETED, payload: string };
type InputAction = { type: typeof INPUT, payload: string };

type Action = ActiveAction | AllAction | CompletedAction | InputAction;

const all = (query: string):AllAction => (
  { type: ALL, payload: query });

const active = (query: string):ActiveAction => (
  { type: 'ACTIVE', payload: query });

const completed = (query: string): CompletedAction => (
  { type: 'COMPLETED', payload: query });

const input = (query: string): InputAction => (
  { type: 'INPUT', payload: query });

export const actions = {
  all, active, completed, input,
};

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVE:
      return {
        query: action.payload,
        status: 'active',
      };
    case COMPLETED:
      return {
        query: action.payload,
        status: 'completed',
      };
    case ALL:
      return {
        query: action.payload,
        status: 'all',
      };
    case INPUT:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
