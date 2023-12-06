// we use string literal as a type to avoid mistype in future

// payload is a typical name for an action data
export type ChangeQueryAction = {
  type: 'currentQuery/CHANGE';
  payload: string;
};

// Action creator return type protect us from a mistype
const changeQuery = (value: string): ChangeQueryAction => ({
  type: 'currentQuery/CHANGE', payload: value,
});

export type ChangeStatusAction = {
  type: 'currentStatus/CHANGE';
  payload: string;
};

const changeStatus = (
  value: string,
): ChangeStatusAction => ({
  type: 'currentStatus/CHANGE', payload: value,
});

// These actions will be used in the application
export const actions = { changeQuery, changeStatus };

type State = { query: string, status: string };
type Action = ChangeQueryAction | ChangeStatusAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'currentQuery/CHANGE':
      return { ...state, query: action.payload };
    case 'currentStatus/CHANGE':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
