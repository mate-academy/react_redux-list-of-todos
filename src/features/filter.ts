type ChangeQuery = { type: 'filter/changeQuery', payload: string };
type ChangeStatus = { type: 'filter/changeStatus', payload: Status };
type Action = ChangeQuery | ChangeStatus;
type StateType = { query: string, status: string };

const changeQuery = (query: string): ChangeQuery => ({
  type: 'filter/changeQuery',
  payload: query,
});

const changeStatus = (status: string): ChangeStatus => ({
  type: 'filter/changeStatus',
  payload: status,
});

export const actions = { changeQuery, changeStatus };

const startValue: StateType = { query: '', status: 'all' };

const filterReducer = (
  state: StateType = startValue,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/changeQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/changeStatus':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
